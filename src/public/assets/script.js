const { authorization } = localStorage

const content = $("#content")

const api = axios.create({
  baseURL: '/api/'
})

function addLastUser({ id, name, createdAt, photo }){

  const divCardProfile = document.createElement('div');
  divCardProfile.className = 'card profile';

  const divUser = document.createElement('div');
  divUser.className = 'user';

  const imgPhoto = document.createElement('img');
  imgPhoto.src = photo ? photo : 'assets/perfil.png';
  
  const p = document.createElement('p');
  p.textContent = name

  divUser.appendChild(imgPhoto);
  divUser.appendChild(p);

  divCardProfile.appendChild(divUser);

  $(".users").append(divCardProfile);
}

function addPost({ user, title, content, createdAt }){
  // if(!id )
  const { name, id, photo } = user;

  const postDiv = document.createElement('div')
  postDiv.className = "post";

  const divField_1 = document.createElement('div')
  divField_1.className = 'field-1'

  const divUserinfo = document.createElement('div');
  divUserinfo.className = 'user-info';

  const imgProfile = document.createElement('img');
  imgProfile.src = photo ? photo : 'assets/perfil.png';

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

  postDiv.appendChild(divField_1)
  postDiv.appendChild(divField_2)

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
    const user = await api.get('user', {
      headers: {
        authorization
      }
    })
    
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

  }catch(err){
    console.log({ error: err.message });
  }
})()