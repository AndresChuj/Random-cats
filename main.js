// const api = axios.create({
//   baseURL: 'https://api.thecatapi.com/v1'
// });
// api.defaults.headers.common['X-API-KEY'] = 'live_BzW7TlvfzRaKT4E1cxLScNbX4ylv6TXDezDCOW8qAiKzAgeKqEukc1AaYnlysZMt';

const Api_URL_Random = 'https://api.thecatapi.com/v1/images/search?limit=2';
const Api_URL_Favorites = 'https://api.thecatapi.com/v1/favourites';
const Api_URL_Favorites_Delete =  (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const Api_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

// window.addEventListener('load', randomCats);


const spanError = document.getElementById('error')

async function randomCats() {
  const res = await fetch(Api_URL_Random);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(Api_URL_Favorites,{
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_BzW7TlvfzRaKT4E1cxLScNbX4ylv6TXDezDCOW8qAiKzAgeKqEukc1AaYnlysZMt',
    },
  });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }else{
    const section = document.getElementById('favoritesMichis');
    section.innerHTML = "";
    // const h2 = document.createElement('h2');
    // const h2Text = document.createTextNode('michis favoritos');
    // h2.appendChild(h2Text);
    // section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('sacar al michi de favoritos');
  
      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  };
};

async function saveFavouriteMichi(id) {
  // const { data, status } = await api.post('/favourites', {
  //   image_id: id,
  // });
  
  const res = await fetch(Api_URL_Favorites, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'live_BzW7TlvfzRaKT4E1cxLScNbX4ylv6TXDezDCOW8qAiKzAgeKqEukc1AaYnlysZMt',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('Save')

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi guardado en favoritos')
    loadFavouriteMichis();
  }
};


async function deleteFavouriteMichi(id) {
  const res = await fetch(Api_URL_Favorites_Delete(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_BzW7TlvfzRaKT4E1cxLScNbX4ylv6TXDezDCOW8qAiKzAgeKqEukc1AaYnlysZMt',
    },
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }else{
    console.log('michis eliminados de favoritos');
  }

  loadFavouriteMichis();
}

async function uploadMichiPhoto(){
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);


  console.log(formData.get('file'));

  const res = await fetch(Api_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'live_BzW7TlvfzRaKT4E1cxLScNbX4ylv6TXDezDCOW8qAiKzAgeKqEukc1AaYnlysZMt',
    },
    body: formData,
  });

  const data = await res.json()

  if (res.status !== 201) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }else{
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteMichi(data.id);
  }


}

randomCats()
loadFavouriteMichis();





// function randomCats(){
//   fetch(URL)
//   .then(rest => rest.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url
//   });
// }


