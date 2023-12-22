camera = document.getElementById("camera");
resultado = document.getElementById("result");
nomeObjeto = document.getElementById("resultObjectName");
precisao = document.getElementById("resultObjectAccuracy");
synth = window.speechSynthesis

Webcam.set({
  width:400,
  height:300,
  image_format:"png",
  png_quality:90
});

Webcam.attach("#camera");

function takeSnapshot() {
  Webcam.snap(function (data_uri) {
    resultado.innerHTML = "<img id='imagemCapturada' src='" +data_uri+"' >";
  })
}  
  

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qZ-upih3U/model.json',modelLoaded);
  function modelLoaded() {
    console.log('Model Loaded!');
    console.log("ml5 versao: ",ml5.version);
  }
    //C-105  
 
    function check() {
      img =document.getElementById("imagemCapturada");
      classifier.classify(img,gotResult);
    }

    function gotResult(error,result) {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
        document.getElementById("resultObjectName").innerHTML = result[0].label;
        document.getElementById("resultObjectAccuracy").innerHTML = result[0].confidence.toFixed(2);
        
        speak_data = "Este objeto é" + result[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis)
      }
    }
