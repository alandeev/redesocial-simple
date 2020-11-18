const nameElement = document.getElementById("name")
const emailElement = document.getElementById("email")
const passwordElement = document.getElementById("password")
const messageElement = document.getElementById("messageAlert")

function setMessage(message, color){
  messageElement.style.color = color;
  messageElement.textContent = message;
}

function sleep(seconds){
  return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

const medias = {
  "linkedin": "https://www.linkedin.com/in/alandev2/",
  "github": "https://github.com/alandev2/"
}

function openmedia(media){
  const locate = medias[media];
  window.location.replace(locate)
}

(async function(){  
  document.getElementsByTagName("form")[0].addEventListener('submit', async (event) => {
    event.preventDefault();

    let name = nameElement.value;
    let email = emailElement.value;
    let password = passwordElement.value;

    if(!email || !password|| !name) return setMessage("Falta algum parametro!", "#fff")

    setMessage("", "#fff")

    try{
      const { data } = await axios.post("/api/register", { name, email, password });
      setMessage("Cadastrado! Redirecionando...", "#DFF2BF")
      await sleep(3);
      window.location.replace('/auth');
    }catch({ response }){
      const data = response.data;
      setMessage(data.error, "#FFBABA");
      if(data.type == 'email')
        return emailElement.value = "";
    }
  })
})()