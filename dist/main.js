const synth=window.speechSynthesis;
const form=document.querySelector('form');
const pitch=document.querySelector('#pitch');
const rateval=document.querySelector('#rate-value');
const pitchval=document.querySelector('#pitch-value');
const rate=document.querySelector('#rate')
const text=document.querySelector('#text-input')
const vol=document.querySelector('#volume')
const selectvoice=document.querySelector('#select-voice')
const body=document.querySelector('body')
const volvalue=document.querySelector('#vol-value')
let voices=[];
function givevoices()
{
    voices=synth.getVoices();
    console.log(voices)
    voices.forEach(voice => 
        {
            const option=document.createElement('option')
            option.innerHTML=voice.name + (voice.lang)
            option.setAttribute('data-name',voice.name)
            option.setAttribute('data-lang',voice.lang)
            selectvoice.appendChild(option)
        })

}
givevoices();
if(synth.onvoiceschanged!==undefined)
{
    synth.onvoiceschanged=givevoices;
}

function speak()
{
    if(synth.speaking)
    {
        console.error('currently speaking')
    }
    if(text.value!=='')
    
    {
        document.body.style.background='#141414 url(img/3.gif)'
         
       const speak=new SpeechSynthesisUtterance(text.value) 
       speak.onend=() =>
       {
           console.log('done speaking')
           document.body.style.background='#141414'
       }
       speak.onerror=() =>
       {
           console.error('error while speaking')
       }
       const myvoice=selectvoice.selectedOptions[0].getAttribute('data-name');
       voices.forEach(voice =>{
           if(voice.name==myvoice)
           {
               speak.voice=voice
           }
       })
       speak.rate=rate.value;
       speak.pitch=pitch.value
       speak.volume=vol.value;
       synth.speak(speak);

    }
}
form.addEventListener('submit',(e) => {
    e.preventDefault();
    speak();
   
})
rate.addEventListener('change',() => rateval.textContent=rate.value)
pitch.addEventListener('change',() => pitchval.textContent=pitch.value)
vol.addEventListener('change',() => volvalue.textContent=vol.value)
selectvoice.addEventListener('change',speak)