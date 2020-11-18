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
  "linkedin": "http://jsfiddle.net/u7tYE/",
  "github": "https://i.morioh.com/2020/03/23/5231af2dbd3b.jpg"
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

    if(!email || !password) return console.log("Falta enviar email e senha");

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