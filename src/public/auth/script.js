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

    let email = emailElement.value;
    let password = passwordElement.value;

    if(!email || !password) return setMessage("Falta enviar o Email/Senha", "#FFBABA");

    try{
      const { data } = await axios.post("/api/authenticate", { email, password });
      localStorage.setItem("authorization", data.token);
      setMessage("Conectado! Redirecionando...", "#DFF2BF")
      await sleep(3);
      window.location.replace('/');
    }catch({ response }){
      const data = response.data;
      setMessage(data.error, "#FFBABA");
      if(data.type == 'email')
        return emailElement.value = "";

      if(data.type == 'password')
        return passwordElement.value = "";
    }
  })
})()