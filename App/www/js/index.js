document.addEventListener('deviceready', onDeviceReady, false);


device_language = "";

function onDeviceReady() {

  checkConnection();

  navigator.globalization.getPreferredLanguage(
    function (language) {
      device_language = language.value;
    },
    function () {alert('Error getting language\n');}
  );

  if(device_language == "tr-TR"){
    document.getElementById("info-text").innerHTML = "BEN YENİ BİR YAPAY ZEKA MODELİYİM. BU YÜZDEN YANILDIĞIM NOKTALAR OLABİLİR. ZAMANLA SİZE DAHA İYİ HİZMET SUNABİLMEK İÇİN KENDİMİ EĞİTECEĞİM."
  }else{
    document.getElementById("info-text").innerHTML = "I'M A NEW AI MODEL. SO THERE MAY BE WHERE I WRONG. I WILL TEACH MYSELF IN TIME TO SERVE YOU BETTER.";
  }

  if(device_language == "tr-TR"){
    document.getElementById("important").innerHTML = "ÖNEMLİ!"
  }else{
    document.getElementById("important").innerHTML = "IMPORTANT!";
  }

  console.log(device_language);
}


function checkConnection() {
  var networkState = navigator.connection.type;

  if (networkState === Connection.NONE) {
      document.getElementById("noethernet").style.display = "flex";
      document.getElementById("upload").style.display = "none";
      document.getElementById("show-result").style.display = "none";
      document.getElementById("loading").style.display = "none";
  } else {
      document.getElementById("noethernet").style.display = "none"
      document.getElementById("upload").style.display = "flex";
      document.getElementById("show-result").style.display = "none";
      document.getElementById("loading").style.display = "none";
  }
}


function sendToML() {

  document.getElementById("noethernet").style.display = "none"
  document.getElementById("upload").style.display = "none";
  document.getElementById("show-result").style.display = "none";
  document.getElementById("loading").style.display = "flex";

  var fileInput = document.getElementById('file-5');
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append('file', file);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://109.106.244.67:5000/predict', true);

  xhr.onload = function () {



    if (xhr.readyState === 4) { // Cevap hazır
      if (xhr.status === 200) { // Başarılı

        document.getElementById("noethernet").style.display = "none"
        document.getElementById("upload").style.display = "none";
        document.getElementById("show-result").style.display = "block";
        document.getElementById("loading").style.display = "none";

        console.log(xhr.responseText);
        document.getElementById("cevap").innerHTML = xhr.responseText.toUpperCase(); // Cevabı yazdır
        
        //DOG
        if(xhr.responseText == "angry"){
          document.getElementById("result-image").src = "./img/gifs/angry.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "SİNİRLİ"
            document.getElementById("result-text").innerHTML = "KÖPEĞİNİZ SİNİRLİ GÖRÜNÜYOR! AMAN PEK YAKLAŞMAYIN!";
          }else{
            document.getElementById("result-text").innerHTML = "YOUR DOG LOOKS ANGRY! DON'T COME TOO CLOSE!";
          }

        }
        if(xhr.response == "sad"){
          document.getElementById("result-image").src = "./img/gifs/sad.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "ÜZGÜN"
            document.getElementById("result-text").innerHTML = "KÖPEĞİNİZ ÜZGÜN GÖRÜNÜYOR :( ONA BİRAZCIK SEVGİNİZİ GÖSTERMENİN TAM ZAMANI!";
          }else{
            document.getElementById("result-text").innerHTML = "YOUR DOG LOOKS SAD :( IT'S TIME TO SHOW HIM/HER LITTLE LOVE!";
          }

        }
        if(xhr.response == "hungry"){
          document.getElementById("result-image").src = "./img/gifs/hungry.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "AÇ"
            document.getElementById("result-text").innerHTML = "KÖPEĞİNİZ ÜZGÜN GÖRÜNÜYOR :( ONA BİRAZCIK SEVGİNİZİ GÖSTERMENİN TAM ZAMANI!";
          }else{
            document.getElementById("result-text").innerHTML = "YOUR DOG LOOKS SAD :( IT'S TIME TO SHOW HIM/HER LITTLE LOVE!";
          }

        }
        if(xhr.response == "happy"){
          document.getElementById("result-image").src = "./img/gifs/happy.gif";
          document.getElementById("result-image").style.width = "20rem";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "MUTLU"
            document.getElementById("result-text").innerHTML = "KÖPEĞİNİZ ŞU AN ÇOK MUTLU! BÖYLE DEVAM!!!";
          }else{
            document.getElementById("result-text").innerHTML = "YOUR DOG IS VERY HAPPY NOW! KEEP GOING LIKE THIS!!!";
          }

        }
        if(xhr.response == "relaxed"){
          document.getElementById("result-image").src = "./img/gifs/relaxed.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "RAHAT"
            document.getElementById("result-text").innerHTML = "KÖPEĞİNİZİN KEYFİ ŞU AN YERİNDE";
          }else{
            document.getElementById("result-text").innerHTML = "YOUR DOG LOOKS RELAXED";
          }
        }
        //OTHERS
        if(xhr.response == "cat"){
          document.getElementById("result-image").src = "./img/gifs/cat.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "OLAMAZ! KEDİ!"
            document.getElementById("result-text").innerHTML = "BUNU BİR KEDİ OLARAK TANIMLADIM. HENÜZ KEDİLERİN DUYGULARINI ANALİZ EDEMİYORUM ANCAK YAKIN ZAMANDA EDEBİLECEĞİM. ÜZGÜNÜM.";
          }else{
            document.getElementById("result-text").innerHTML = "I DEFINED THIS AS A CAT. I CAN'T ANALYZE CAT'S EMOTIONS YE, BUT I WILL SOON. SORRY.";
          }
        }
        if(xhr.response == "human"){
          document.getElementById("result-image").src = "./img/gifs/human.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "HAHA! BU BİR İNSAN!"
            document.getElementById("result-text").innerHTML = "BUNU BİR İNSAN OLARAK TANIMLADIM. HENÜZ İNSANLARIN DUYGULARINI ANALİZ EDEMİYORUM ANCAK YAKIN ZAMANDA EDEBİLECEĞİM. ÜZGÜNÜM.";
          }else{
            document.getElementById("result-text").innerHTML = "I DEFINED THIS AS A CAT. I CAN'T ANALYZE CAT'S EMOTIONS YET, BUT I WILL SOON. SORRY.";
          }
        }
        if(xhr.response == "none"){
          document.getElementById("result-image").src = "./img/gifs/normal.gif";

          if(device_language == "tr-TR"){
            document.getElementById("cevap").innerHTML = "BU NE YA???"
            document.getElementById("result-text").innerHTML = "ÜZGÜNÜM BU RESİMDE BİR CANLI TANIMLAYAMADIM. BAŞKA BİR RESİM YÜKLEMEYİ DENEYİN.";
          }else{
            document.getElementById("result-text").innerHTML = "SORRY I CAN'T IDENTIFY A LIVE IN THIS PICTURE. TRY TO UPLOAD ANOTHER IMAGE.";
          }
        }


      } else {
        console.error('Sunucu hatası:', xhr.status); // Hata mesajı yazdır
        document.getElementById("cevap").innerHTML = xhr.status;

        document.getElementById("noethernet").style.display = "none"
        document.getElementById("upload").style.display = "flex";
        document.getElementById("show-result").style.display = "none";
        document.getElementById("loading").style.display = "none";
      }
    }
  };

  xhr.send(formData);
}

function onFail(message) {
  alert('Failed to take photo: ' + message);
}

function OK(){
  document.getElementById("noethernet").style.display = "none";
  document.getElementById("upload").style.display = "flex";
  document.getElementById("show-result").style.display = "none";
  document.getElementById("loading").style.display = "none";
}

