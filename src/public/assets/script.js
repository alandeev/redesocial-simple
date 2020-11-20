const { authorization } = localStorage

const content = $("#content")

const api = axios.create({
  baseURL: '/api/'
})

function addPost({ user, title, content, createdAt }){
  // if(!id )
  const { name, id, photo } = user;

  const postDiv = document.createElement('div')
  postDiv.className = "post";

  const divField_1 = document.createElement('div')
  divField_1.className = 'field-1'

  const pFullname = document.createElement('p');
  pFullname.className = 'fullname';
  pFullname.textContent = name;

  const pTitle = document.createElement('p');
  pTitle.className = 'title';
  pTitle.textContent = title;

  //divfield_1 Ok
  divField_1.appendChild(pFullname)
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

    }catch({ data }){
      return console.log({ error: data.error }); 
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

    if(posts.length == 0)
      return console.log({ error: "NOT HAVE POSTS" });

    posts.forEach(post => addPost(post));

  }catch(err){
    console.log({ error: err.message });
  }
})()