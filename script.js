const containerVideos = document.querySelector('.videos__container');

async function searchAndShowVideos(){
    try {
        const search = await fetch("http://localhost:3000/videos")
        const videos = await search.json()
        
        videos.forEach((video) =>{
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `
        });
        
    } catch (error) {
        containerVideos.innerHTML = `
        <p>Houve um erro ao carregar os vídeos: ${error}</p>       
        `
    }
}

searchAndShowVideos();

const searchBar = document.querySelector(".pesquisar__input")
searchBar.addEventListener('input', filterBytitle);

function filterBytitle() {

    const videos = document.querySelectorAll(".videos__item");
    const valueBar = searchBar.value.toLowerCase();

    videos.forEach((video) => {
        const title = video.querySelector(".titulo-video").textContent.toLocaleLowerCase();

        video.style.display = valueBar ? title.includes(valueBar) ? "block" : "none" : "block";
    });
}

const categoryFilter = document.querySelectorAll(".superior__item")

categoryFilter.forEach((btn) => {
    let categoryName = btn.getAttribute("name")
    
    btn.addEventListener("click", () => filterByCategory(categoryName))
})

function filterByCategory(filter) {
    const videos = document.querySelectorAll(".videos__item")

    videos.forEach((video) => {
        let cat = video.querySelector(".categoria").textContent.toLocaleLowerCase()
        let filterCat = filter.toLocaleLowerCase()

        if (!cat.includes(filterCat) && filterCat !== "tudo") {
            video.style.display = "none"
        } else {
            video.style.display = "block"
        }
    })
}

