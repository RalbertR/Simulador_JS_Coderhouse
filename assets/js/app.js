//CONSTRUCTOR DE VEHICULO
class Vehiculo{
    constructor (id, marca, modelo, dominio, clase, anoFabricacion, kilometraje, fechaKilometraje, kmService, fechaService, enServicio, frecuenciaDeServicio){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.dominio = dominio.toUpperCase();
        this.clase = clase.toUpperCase();
        this.anoFabricacion = anoFabricacion;
        this.kilometraje = kilometraje;
        this.fechaKilometraje = fechaKilometraje;
        this.kmService = kmService;
        this.fechaUltimoService = fechaService;
        this.enServicio = enServicio;
        this.frecuenciaDeServicio = frecuenciaDeServicio;
        this.servicesRealizados = [];
    }

    calcularEstadoService(){
        if(this.kilometraje > this.kmService){
            let diferenciaKilometraje = this.kilometraje - this.kmService;
        
            if (diferenciaKilometraje < (this.frecuenciaDeServicio - 1000)){
                // console.log("Aun no es necesario realizar service de mantenimiento preventivo.");
                return -1;
            }else if(diferenciaKilometraje <= this.frecuencia && diferenciaKilometraje >= (this.frecuencia - 1000)){
                // console.log("Atento. Service de mantenimiento preventivo proximo a realizarse!")
                return 0;
            }else if(diferenciaKilometraje >= this.frecuenciaDeServicio){
                // console.log("Service de mantenimiento sobrepasado de kilometros, realizar urgente Service.")
                return 1;
            }
   
        }else{ console.log("Error en carga de kilometraje de Service. Verificar.")}  
    }

    calcular5ProximosService(){
        let textoProximosService = "Sus proximos services serán: "
        for (let i = 1; i < 6; i++){
            let service = this.kmService + (this.frecuenciaDeServicio * i);
            textoProximosService = `${textoProximosService} ${service}km. `;
        }
        return textoProximosService;
    }

}

// CONSULTA LOCALSTORAGE
let vehiculos = [];
let listaVehiculosEnLocalStorage = JSON.parse(localStorage.getItem(`vehiculosAlmacenados`));

if (listaVehiculosEnLocalStorage != null){
    for (const auto of listaVehiculosEnLocalStorage){
        vehiculos.push(Object.assign({}, auto));
    }
    Swal.fire({
        icon: 'info',
        text: 'Vehiculos encontrados en Base de datos, se carga planilla diaria.',
      });
    renderPlanilla(vehiculos);
}else{
    fetchVehiculos();
    Swal.fire({
        icon: 'warning',
        text: 'Vehiculos no encontrados en Base de datos, se carga planilla con vehiculos por defecto.',
      }); 
}
async function fetchVehiculos() {
    const resp = await fetch("/vehiculos.json");
    const data = await resp.json();
    console.log(data);

    for (const auto of data){
        console.log(auto)
        vehiculos.push(Object.assign({}, auto));
    }
    renderPlanilla(vehiculos);

}

function renderPlanilla(vehiculosACargar){
    let planilla = document.getElementById("cuerpoPlanillaAutomotores");
    for (const vehiculo of vehiculosACargar){
        let row = document.createElement("tr");
        row.className = "filaVehiculo";
        row.innerHTML = `<td class="identificadorPlanilla">${vehiculo.id}</td>
                        <td class="marcaPlanilla">${vehiculo.marca}</td>
                        <td class="modeloPlanilla">${vehiculo.modelo}</td>
                        <td class="dominioPlanilla">${vehiculo.dominio}</td>
                        <td class="kmPlanilla">${numeroConPuntos(vehiculo.kilometraje)}</td>
                        <td class="kmServicePlanilla">${numeroConPuntos(vehiculo.kmService)}</td>`;
        planilla.appendChild(row);
    }
    guardarEnLS(vehiculosACargar);
}

function borrarPlanilla(){ 
    let borrarArray = document.getElementsByClassName("filaVehiculo");
    while (borrarArray[0]) borrarArray[0].parentNode.removeChild(borrarArray[0]);
}

function filtrarPorMarca(marcaBuscada){
    
    arrayFiltradoMarca = vehiculos.filter((i) => i.marca.includes(marcaBuscada));
    arrayFiltradoMarca.length === 0 ? alert("No existen coincidencias con su busqueda.") : arrayFiltradoMarca;
}

function actualizarKilometraje(dominio, nuevoKilometraje){
    let movilBuscado = vehiculos.find((i) => i.dominio === dominio.toUpperCase());
    if(movilBuscado != undefined){
        let movilEncontrado = vehiculos[vehiculos.indexOf(movilBuscado)];
        if(nuevoKilometraje > movilEncontrado.kilometraje){

            movilEncontrado.kilometraje = nuevoKilometraje;
            movilEncontrado.fechaKilometraje = new Date();
            vehiculos[vehiculos.indexOf(movilBuscado)].kilometraje = nuevoKilometraje;

            borrarPlanilla();
            renderPlanilla(vehiculos);

            Swal.fire({
                icon: 'info',
                text: `Kilometraje del movil dominio ${dominio} actualizado correctamente a ${nuevoKilometraje}.`,
              });
            console.log(`Fecha de actualizacion de kilometraje ${movilEncontrado.fechaKilometraje.toLocaleString()}`);

        }else{
            alert(`Verificar kilometraje ingresado, kilometraje menor al actual`);
        }
        
    }else{
        alert(`Movil no encontrado con dominio ${dominio}`);
    }
    
}

function actualizarService(dominio, nuevoService){
    let movilBuscado = vehiculos.find((i) => i.dominio === dominio.toUpperCase());
    if(movilBuscado != undefined){
        let movilEncontrado = vehiculos[vehiculos.indexOf(movilBuscado)];
        if(nuevoService > movilEncontrado.kmService){
            movilEncontrado.kmService = nuevoService;
            movilEncontrado.fechaService = new Date();
            vehiculos[vehiculos.indexOf(movilBuscado)].kmService = nuevoService;
            
            borrarPlanilla();
            renderPlanilla(vehiculos);

            console.log(`Service del movil dominio ${dominio} actualizado correctamente a ${nuevoService}.`)
            console.log(`Fecha de actualizacion de service ${movilEncontrado.fechaService.toLocaleString()}`);

        }else{
            console.log(`Verificar kilometraje de service ingresado, kilometraje menor al actual`);
        }
        
    }else{
        console.log(`Movil no encontrado con dominio ${dominio}`);
    }
}

function agregarVehiculo(marca, modelo, dominio, clase, anoFabricacion, kilometraje, kmService, enServicio, frecuenciaDeServicio){
    let idNuevoVehiculo = vehiculos[vehiculos.length - 1].id + 1;
    let nuevoVehiculo =  new Vehiculo(idNuevoVehiculo, marca, modelo, dominio, clase, anoFabricacion, kilometraje, new Date(), kmService, new Date(), enServicio, frecuenciaDeServicio);
    vehiculos.push(nuevoVehiculo);
    borrarPlanilla();
    renderPlanilla(vehiculos);
}

function borrarVehiculo(patente){
    let movilBuscado = vehiculos.find((i) => i.dominio === patente.toUpperCase());
    if(movilBuscado != undefined){
        vehiculos.splice(vehiculos.indexOf(movilBuscado), 1);
        borrarPlanilla();
        renderPlanilla(vehiculos);
    }else{alert("Movil no encontrado.");}
}

function guardarEnLS(arrayDeVehiculos){
    localStorage.clear();
    localStorage.setItem("vehiculosAlmacenados", JSON.stringify(vehiculos));
}

//BOTONES 

let botonModKM = document.getElementById("botonModificarKm");
botonModKM.onclick = () => actualizarKilometraje(prompt("Ingresar Dominio"),prompt("Ingresar Nuevo Kilometraje"));

let botonServiceKM = document.getElementById("botonService");
botonServiceKM.onclick = () => actualizarService(prompt("Ingresar Dominio"),prompt("Ingresar Nuevo Service"));


let botonAgregarVehiculo = document.getElementById("botonAgregarVehiculo");
botonAgregarVehiculo.onclick = () => {
    let marca = prompt("Ingrese Marca de Vehiculo");
    let modelo = prompt("Ingrese Modelo de Vehiculo");
    let dominio = prompt("Ingrese Dominio de Vehiculo");
    let clase = prompt("Ingrese Clase de Vehiculo");
    let anoFab = prompt("Ingrese Año de Fabricación de Vehiculo");
    let km = prompt("Ingrese Kilometraje Actual de Vehiculo");
    let kmService = prompt("Ingrese Kilometraje de Ultimo service realizado de Vehiculo");
    let enServ = prompt("Vehiculo en servicio? True / False");
    let frecuencia = prompt("Ingrese Frecuencia de Service de Vehiculo");
    agregarVehiculo(marca, modelo, dominio, clase, anoFab, km, kmService, enServ, frecuencia)
}

let botonEliminarVehiculo = document.getElementById("botonEliminarVehiculo");
botonEliminarVehiculo.onclick = () => {
    borrarVehiculo(prompt("Ingrese Dominio a borrar: "));
};
// let prueba = document.getElementById("botonPrueba");
// prueba.onclick = () => {
//     localStorage.clear();
// }

function numeroConPuntos(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

