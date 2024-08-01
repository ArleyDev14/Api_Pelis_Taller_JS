//Creación de paginación ##################################################################################################
let pagina = 1;
const btnanterior = document.getElementById('btnanterior');
const btnsiguiente = document.getElementById('btnsiguiente');

btnsiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargar_api();
	}
});

btnanterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargar_api();
	}
});
//###########################################################################################################################
//Apikey: 62394fa01f45b3facb4f2db1acc666c6
//Definir asincronia 
const cargar_api =  async()=>{
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=62394fa01f45b3facb4f2db1acc666c6&page=${pagina}`)
        console.log(respuesta)

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            let peliculas = "";
            datos.results.forEach(pelicula => {
                peliculas +=`
                <div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
					<div class="inf-peli">
                        <h3 class="titulo">${pelicula.title}</h3>
                        <hr>
                        <h3 class="info">Lanzamiento:</h3>
                        <h3>${pelicula.release_date}</h3>
                    </div>
				</div>`
            })
            document.getElementById("container").innerHTML = peliculas;
        }else if(respuesta.status === 401){
            console.log("Pusiste la llave mal")
        }else if(respuesta.status === 404){
            console.log("La pelicula que buscas no existe")
        }else{
            console.log("Error-Fail")
        }
            

    } catch (error) {
        console.log(error)
    }
}

cargar_api()
//###########################################################################################################################

