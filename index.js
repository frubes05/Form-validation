let podaci=(function (){

  let tijelo=document.querySelector('tbody');
  let tablica=document.querySelector('.tablica');

  let name=document.querySelector('#name');
  let zipcode=document.querySelector('#zip');
  let emails=document.querySelector('#email');
  let phone=document.querySelector('#phone');

  let feedbackOne=document.querySelector('.one');

  let alert=document.querySelector('.alert');

  let dodajPodatke= function (ime,zip,email,telefon) {
    let red=document.createElement('tr');
    red.innerHTML=`
    <td>${ime}</td>
    <td>${zip}</td>
    <td>${email}</td>
    <td>${telefon}</td>
    <td class="izadi"></td>
    `;
    red.setAttribute('class','obrisi');
    tijelo.appendChild(red);
    tablica.style.display="block";
  }

  let obrisiUnos=function(){
    name.value="";
    zipcode.value="";
    emails.value="";
    phone.value="";
  }

  return{
    tijelo:tijelo,
    tablica:tablica,
    dodajPodatke:dodajPodatke,
    obrisiUnos:obrisiUnos,
    alert:alert,
    name:name,
    zipcode:zipcode,
    emails:emails,
    phone:phone
  }
})();


document.querySelector('.gumb').addEventListener('click', povratiPodatke);

function povratiPodatke(e){
  let name=document.querySelector('#name').value;
  let namediv=document.querySelector('#name');
  let zipcode=document.querySelector('#zip').value;
  let emails=document.querySelector('#email').value;
  let phone=document.querySelector('#phone').value;
  let loader=document.querySelector('.loader');

  let ime=e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.previousElementSibling;
  let zip=e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.previousElementSibling;
  let mail=e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.previousElementSibling;
  let broj=e.target.parentElement.previousElementSibling.lastElementChild.previousElementSibling;

  if(name==""||zipcode==""||emails==""||phone=="" || broj.classList.contains('is-invalid') || mail.classList.contains('is-invalid') || zip.classList.contains('is-invalid') ){
    podaci.alert.classList.add('alert-danger');
    podaci.alert.style.display="block";
    podaci.alert.innerHTML=`<p>Neispravno unešene vrijednosti!</p>`;
    setTimeout(()=>{
      podaci.alert.style.display="none";
      podaci.alert.classList.remove('alert-danger');
    },1000);
  }else{
    podaci.tablica.style.display="none";
    loader.style.display="block";

    let promise=new Promise((resolve,reject) =>{
      setTimeout(()=>{
        loader.style.display="none";
        resolve();
      },1000);
    });
    promise.then(()=>{
      podaci.dodajPodatke(name,zipcode,emails,phone)
    }).then(()=>{
      podaci.alert.classList.add("alert-success");
      podaci.alert.style.display="block";
      podaci.alert.innerHTML=`<p>Podatak uspješno dodan!</p>`;
      setTimeout(()=>{
        podaci.alert.style.display="none";
      },1000);
    })
    promise.then(()=>{
      podaci.obrisiUnos();
    })

  }

  e.preventDefault();
}


document.body.addEventListener('click', izbrisiPodatke);

function izbrisiPodatke(e){
       if(e.target.classList.contains('izadi')){
        e.target.parentElement.remove();
        podaci.alert.innerHTML=`<p>Podatak uspješno obrisan</p>`;
        podaci.alert.classList.remove('alert-danger');
        podaci.alert.classList.add('alert-success');
        podaci.alert.style.display="block";
        setTimeout(()=>{
          podaci.alert.style.display="none";
          podaci.alert.classList.remove('alert-success');
        },1000)
        let podatak=document.querySelectorAll('tbody tr').length;
        if(podatak==0){
          podaci.tablica.style.display="none";
        }
      }
  e.preventDefault();
}

document.querySelector('#name').addEventListener('blur',provjeriIme);

function provjeriIme(e){
  let name=document.querySelector('#name');
  let ime=/^[a-z ,.'-]+$/i;
  if(!ime.test(name.value)){
    name.classList.add('is-invalid');
  }else{
    name.classList.remove('is-invalid');
  }
}


document.querySelector('#zip').addEventListener('blur',provjeriZip);

function provjeriZip(e){
  let zipcode=document.querySelector('#zip');
  let zip=/^[0-9]{4,5}$/;
  if(!zip.test(zipcode.value)){
    zipcode.classList.add('is-invalid');
  }else{
    zipcode.classList.remove('is-invalid');
  }
}



document.querySelector('#email').addEventListener('blur',provjeriEmail);

function provjeriEmail(e){
  let email=document.querySelector('#email');
  let emails=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i;
  if(!emails.test(email.value)){
    email.classList.add('is-invalid');
  }else{
    email.classList.remove('is-invalid');
  }
}


document.querySelector('#phone').addEventListener('blur',provjeriPhone);

function provjeriPhone(e){
  let phone=document.querySelector('#phone');
  let telefon=/^[0-9]{10}$/i;
  if(!telefon.test(phone.value)){
    phone.classList.add('is-invalid');
  }else{
    phone.classList.remove('is-invalid');
  }
}
