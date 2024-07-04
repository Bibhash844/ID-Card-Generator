const dashboardDataString = sessionStorage.getItem('dashboardData');
const dashboardData = JSON.parse(dashboardDataString);
const user = dashboardData.user;
const temps = dashboardData.temps;
const orgType = user.orgType;
const imageContainerP = document.getElementById('image_container_portrat');
const imageContainerL = document.getElementById('image_container_landscape');




// adding images to webpage
// const paths = [];
// const ids = [];
// for (let i = 0; i < temps.length; i++) {
//   paths.push(temps[i].path);
//   ids.push(temps[i]._id);
//   const img = document.createElement('img');
//   img.src = paths[i];
//   img.alt = ids[i];
//   if (img.width > img.height){
//     img.id = 'landscape';
//     imageContainerL.appendChild(img);
//   }else{
//     img.id = 'portrat';
//     imageContainerP.appendChild(img);
//   }
// }
const pathsLandscape = [];
const pathsPortrat = [];
const idsLandscape = [];
const idsPortrat = [];

for (let i = 0; i < temps.length; i++) {
  const img = document.createElement('img');
  img.alt = temps[i]._id;
  img.src = temps[i].path;
  img.onload = function() {
    if (img.width > img.height) {
      pathsLandscape.push(img.src);
      idsLandscape.push(img.alt);
    } else {
      pathsPortrat.push(img.src);
      idsPortrat.push(img.alt);
    }
    img.remove();

    if (pathsLandscape.length + pathsPortrat.length === temps.length) {
      appendImages();
    }
  };
}

function appendImages() {
      const imageContainer = document.getElementById('imageContainer');
      
      for (let i = 0; i < pathsPortrat.length; i++) {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'image';
        radio.value = idsPortrat[i];

        const img = document.createElement('img');
        img.src = pathsPortrat[i];
        img.id = 'portrat';

        label.appendChild(radio);
        label.appendChild(img);
        imageContainer.appendChild(label);
      }

      for (let i = 0; i < pathsLandscape.length; i++) {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'image';
        radio.value = idsLandscape[i];

        const img = document.createElement('img');
        img.src = pathsLandscape[i];
        img.id = 'landscape';

        label.appendChild(radio);
        label.appendChild(img);
        imageContainer.appendChild(label);
      }
    }