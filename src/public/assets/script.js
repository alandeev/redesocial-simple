const { authorization } = localStorage

const content = $("#content")

const api = axios.create({
  baseURL: '/api/'
})

const setLoader = (action) => {
  if(action){
    $(".loading")[0].style.display = 'flex';
    $(".app")[0].style.display = 'none';
  }else{
    $(".loading")[0].style.display = 'none';
    $(".app")[0].style.display = 'flex';
  }
}

$("#form_search_user")[0].addEventListener('submit', async (event) => {
  event.preventDefault();
  const key_value = $("#search_key").val();
  if(!key_value) return;

  const posts = (await api.get(`/user/posts/filter?type=searchkey&key=${key_value}`, {
    headers: { authorization }
  })).data

  if(posts.length ==  0){
    return alert("Nenhum contéudo encontrado com essa palavra!")
  }

  $(".posts")[0].textContent = ""
  posts.forEach(post => addPost(post));
  
})

//function add photo
$('#profile-image')[0].addEventListener('click', async (event) => {
  const url = prompt('(URL DA IMAGEM) para trocar. Apenas [png, jpg, jpeg]');
  if(!url) return;
  try{
    const response = (await api.post('user/setphoto', {
      url
    }, {
      headers: { authorization }
    })).data;

    if(response.success)
      return window.location.reload();
  }catch({ response }){
    alert(response.data.error)
  }
})

function sleep(seconds){
  return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

function addLike(action, prop){
  if(action == true){
    console.log({action, prop})
  }else{
    console.log({action, prop})
  }
}

async function actionliked(action, post_id){
  if(!action ||!post_id)
   return;
  
  try{
    const response = (await api.get(`user/posts/${post_id}/${action}`, {
      headers: { authorization }
    })).data

    if(response.error)
      return alert(response.error)

    const element = $(`#likes_id_${post_id}`)[0];
    const number = parseInt(element.textContent);
    const new_number = action == 'like' ? number+1 : number-1;
    if(new_number >= 0)
      return element.textContent = new_number;
    return console.log({ error: "Erro ao tentar setar novo like" })
  }catch({ response }){
    const { data } = response;
    return alert(data.error);
  }
}

function addLastUser({ id, name, createdAt, photo }){

  const divCardProfile = document.createElement('div');
  divCardProfile.className = 'card profile';

  const divUser = document.createElement('div');
  divUser.className = 'user';

  const imgPhoto = document.createElement('img');
  imgPhoto.src = photo ? photo : 'assets/perfil.png';
  imgPhoto.src = photo ? photo : 'assets/perfil.png';
  imgPhoto.onerror = () => (imgPhoto.src = 'assets/perfil.png')
  
  const p = document.createElement('p');
  p.textContent = name

  divUser.appendChild(imgPhoto);
  divUser.appendChild(p);

  divCardProfile.appendChild(divUser);

  $(".users").append(divCardProfile);
}

function addPost({ id, user, title, content, createdAt, likes }){
  const { name, photo } = user;

  const postDiv = document.createElement('div')
  postDiv.className = "post";

  const divField_1 = document.createElement('div')
  divField_1.className = 'field-1'

  const divUserinfo = document.createElement('div');
  divUserinfo.className = 'user-info';

  const imgProfile = document.createElement('img');
  imgProfile.src = photo ? photo : 'assets/perfil.png';
  imgProfile.onerror = () => (imgProfile.src = 'assets/perfil.png')

  const pFullname = document.createElement('p');
  pFullname.className = 'fullname';
  pFullname.textContent = name;

  divUserinfo.appendChild(imgProfile)
  divUserinfo.appendChild(pFullname)

  const pTitle = document.createElement('p');
  pTitle.className = 'title';
  pTitle.textContent = createdAt;

  //divfield_1 Ok
  divField_1.appendChild(divUserinfo)
  divField_1.appendChild(pTitle);

  const divField_2 = document.createElement('div')
  divField_2.className = 'field-2';

  const pDescription = document.createElement('p');
  pDescription.className = 'description';
  pDescription.textContent = content

  divField_2.appendChild(pDescription);

  const divField_3 = document.createElement('div');
  divField_3.className = "field-3";

  const divLikes = document.createElement('div');
  divLikes.className = 'likes';

  const pLikes = document.createElement('p');
  pLikes.id = `likes_id_${id}`;
  pLikes.className = 'like_count';
  pLikes.textContent = likes.length;

  const textLikeds = document.createElement('p');
  textLikeds.textContent = 'curtidas';

  divLikes.appendChild(pLikes)
  divLikes.appendChild(textLikeds);

  const divButtonsliked = document.createElement('div');
  divButtonsliked.className = 'buttonsliked';

  const buttonLiked = document.createElement('button');
  buttonLiked.className = 'buttonlike likedbutton far fa-thumbs-up';
  buttonLiked.onclick = () => actionliked('like', id)

  const buttonUnliked = document.createElement('button');
  buttonUnliked.className = 'buttonlike unlikedbutton far fa-thumbs-down';
  buttonUnliked.onclick = () => actionliked('unlike', id)

  divButtonsliked.appendChild(buttonLiked)
  divButtonsliked.appendChild(buttonUnliked);

  divField_3.appendChild(divLikes);
  divField_3.appendChild(divButtonsliked);

  postDiv.appendChild(divField_1)
  postDiv.appendChild(divField_2)
  postDiv.appendChild(divField_3)

  document.getElementsByClassName("posts")[0].appendChild(postDiv);
}

//creating post and posting
$(".form_search")[0].addEventListener('submit', async (event) => {
    event.preventDefault();
    var value = content.val();
    if(!value) return console.log("NAO TEM CONTENT");
  
    try{
      const create = await api.post('/user/posts', {
          content: value
        }, {
          headers: { authorization }
        }
      );

      window.location.reload();

    }catch(err){
      return alert("Você enviou um conteúdo incorreto.");
    }  
  }
);

//clear button
$("#clearButton")[0].onclick = () => { content.val("") };

function exit(){
  localStorage.clear()
  window.location.replace('/auth')
}

(async function(){
  localStorage.authorization
  try{
    const user = (await api.get('user', {
      headers: {
        authorization
      }
    })).data

    if(user.error){
      localStorage.clear();
      return window.location.replace('/auth');
    }

    const { name, photo } = user;
    console.log({name, photo})
    $("#profile-name")[0].textContent = name;
    $("#profile-image")[0].src = photo ? photo : 'assets/perfil.png';
    $("#profile-image")[0].onerror = () => ($("#profile-imaeg")[0].src = "assets/perfil.png")

    const posts = (await api.get('user/posts', {
      headers: {
        authorization
      }
    })).data

    if(posts.length > 0)
      posts.forEach(post => addPost(post));

    const lastuserscreated = (await api.get('user/all?filter=lastuserscreated', {
      headers: {
        authorization
      }
    })).data


    if(lastuserscreated.length > 0)
       lastuserscreated.forEach(user => addLastUser(user));

    await sleep(3);
    setLoader(false);
  }catch(err){
    console.log({ error: err.message });
  }
})()