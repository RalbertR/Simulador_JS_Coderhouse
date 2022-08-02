let marca;
let modelo;
let anoFabricacion = 0;
let dominio;
let kilometraje = 0;
let kilometrajeService = 0;
let enServicio;
let flag = false;
let frecuenciaDeServicio = 10000;

function agregarVehiculo(){
    marca = prompt("Ingresar numero de acuerdo a Marca de Vehiculo: 1. Ford / 2. Renault / 3. Peugeot / 4. Volkswagen");
    modelo = prompt("Ingresar Modelo");
    dominio = prompt('Ingrese dominio');
    anoFabricacion = parseInt(prompt("Ingresar ano de fabricacion"));
    kilometraje = parseInt(prompt("Ingresar kilometraje actual"));
    kmService = parseInt (prompt("Ingresar kilometraje de ultimo service realizado"));
    if(prompt("Ingresar si vehiculo se encuentra en servicio 1. En servicio / 2. Fuera de servicio") == 1){
        enServicio = true;
    }else{enServicio = false;}
}

function calcularEstadoService(kilometraje, kilometrajeService, frecuencia){
    
    let diferenciaKilometraje = kilometraje - kilometrajeService;
    
    if (diferenciaKilometraje < (frecuencia - 1000)){
        alert("Aun no es necesario realizar service de mantenimiento preventivo.");
    }else if(diferenciaKilometraje <= frecuencia && diferenciaKilometraje >= (frecuencia - 1000)){
        alert("Atento. Service de mantenimiento preventivo proximo a realizarse!")
    }else if(diferenciaKilometraje >= frecuencia){
        alert("Service de mantenimiento sobrepasado de kilometros, realizar urgente Service.")
    }

}

function calcular5ProximosService(kilometrajeService, frecuencia){
    let textoProximosService = "Sus proximos services seran: "
    for (let i = 1; i < 6; i++){
        let service = kilometrajeService + (frecuencia * i);
        textoProximosService = '${textoProximosService} ${service}km. ';
    }
    alert(textoProximosService);
}