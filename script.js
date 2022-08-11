class Vehiculo{
    constructor (id, marca, modelo, dominio, clase, anoFabricacion, kilometraje, fechaKilometraje, kmService, enServicio, frecuenciaDeServicio){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo.toUpperCase();
        this.dominio = dominio.toUpperCase();
        this.clase = clase.toUpperCase();
        this.anoFabricacion = anoFabricacion;
        this.kilometraje = kilometraje;
        this.fechaKilometraje = fechaKilometraje;
        this.kmService = kmService;
        this.enServicio = enServicio;
        this.frecuenciaDeServicio = frecuenciaDeServicio;
        this.servicesRealizados = [];
    }

    calcularEstadoService(){
        if(this.kilometraje > this.kmService){
            let diferenciaKilometraje = this.kilometraje - this.kmService;
        
            if (diferenciaKilometraje < (this.frecuenciaDeServicio - 1000)){
                console.log("Aun no es necesario realizar service de mantenimiento preventivo.");
            }else if(diferenciaKilometraje <= this.frecuencia && diferenciaKilometraje >= (this.frecuencia - 1000)){
                console.log("Atento. Service de mantenimiento preventivo proximo a realizarse!")
            }else if(diferenciaKilometraje >= this.frecuenciaDeServicio){
                console.log("Service de mantenimiento sobrepasado de kilometros, realizar urgente Service.")
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

let vehiculos = [];

function cargarVehiculosEjemplo(){
    vehiculos.push(new Vehiculo(1,"Mercedes-Benz", "Sprinter", "OQF097", "Furgon", 2012, 142922, new Date(2022, 0, 1), 141000, true, 10000));
    vehiculos.push(new Vehiculo(2,"Mercedes-Benz", "Sprinter", "OUQ187","Furgon", 2012, 32988, new Date(2022, 0, 1), 30000, true, 10000));
    vehiculos.push(new Vehiculo(3,"Ford", "Focus", "OKZ812","Sedan", 2013, 56998, new Date(2022, 0, 1), 51922, true, 10000));
    vehiculos.push(new Vehiculo(4,"Volkswagen", "Amarok", "OJW510", "Camioneta", 2011, 209231, new Date(2022, 0, 1), 200198, true, 10000));
    vehiculos.push(new Vehiculo(5,"Volkswagen", "Amarok", "OJW507", "Camioneta", 2011, 300721, new Date(2022, 0, 1), 288236, true, 10000));
    vehiculos.push(new Vehiculo(6,"Iveco", "Tector", "OLR178", "Camion", 2012, 54332, new Date(2022, 0, 1), 53876, true, 15000));
    vehiculos.push(new Vehiculo(7,"Citroën", "Berlingo", "AD356II", "Furgon", 2018, 125567, new Date(2022, 0, 1), 109822, true, 10000));
    vehiculos.push(new Vehiculo(8,"Toyota", "Land Cruiser", "CNR232", "Camioneta", 1998, 489882, new Date(2022, 0, 1), 487233, true, 10000));
    vehiculos.push(new Vehiculo(9,"Ford", "Ranger", "AE680HU", "Camioneta", 2020, 40977, new Date(2022, 0, 1), 39890, true, 10000));
    vehiculos.push(new Vehiculo(10,"Yamaha", "XTZ 250", "427IOV", "Motocicleta", 2015, 7955, new Date(2022, 0, 1), 5923, true, 5000));
}

function filtrarPorMarca(marcaBuscada){
    
    arrayFiltradoMarca = vehiculos.filter((i) => i.marca.includes(marcaBuscada));
    if (arrayFiltradoMarca.length === 0){
            alert("No existen coincidencias con su busqueda.");
        }else{
            return arrayFiltradoMarca;
        }
    
    // CODIGO ANTERIOR
    // let arrayFiltradoMarca = [];
    // for(let i = 0; i < vehiculos.length; i++){
    //     if(vehiculos[i].marca === marca) {
    //         arrayFiltradoMarca.push(vehiculos[i]);
    //     }
    // }
    // if (arrayFiltradoMarca.length === 0){
    //     alert("No existen coincidencias con su busqueda.");
    // }else{
    //     return arrayFiltradoMarca;
    // }
}

function actualizarKilometraje(dominio, nuevoKilometraje){
    let movilBuscado = vehiculos.find((i) => i.dominio === dominio.toUpperCase());
    if(movilBuscado != undefined){
        let movilEncontrado = vehiculos[vehiculos.indexOf(movilBuscado)];
        if(nuevoKilometraje > movilEncontrado.kilometraje){
            movilEncontrado.kilometraje = nuevoKilometraje;
            movilEncontrado.fechaKilometraje = new Date();
            console.log(`Kilometraje del movil dominio ${dominio} actualizado correctamente a ${nuevoKilometraje}.`)
            console.log(`Fecha de actualizacion de kilometraje ${movilEncontrado.fechaKilometraje.toLocaleString()}`);
        }else{
            console.log(`Verificar kilometraje ingresado, kilometraje menor al actual`);
        }
        
    }else{
        console.log(`Movil no encontrado con dominio ${dominio}`);
    }
}

// TESTING
cargarVehiculosEjemplo();

filtrarPorMarca(prompt(`Ingrese Marca a filtrar`));

actualizarKilometraje(prompt(`Ingresar Dominio para Actualizar Kilometraje`), prompt("Ingrese Kilometraje actual"));

