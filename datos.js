//manejo de archivos
const fs = require('fs');

//Arreglo de cursos disponibles
let curso =[
	{
		id: 'C01',
		nombre: 'Programación Web',
		duracion: 32,
		valor: 120000
	},
	{
		id: 'C02',
		nombre: 'Bases de datos',
		duracion: 60,
		valor: 260000
	},
	{
		id: 'C03',
		nombre: 'Desarrollo FrontEnd',
		duracion: 80,
		valor: 300000
	},
	{
		id: 'C04',
		nombre: 'Desarrollo BackEnd',
		duracion: 80,
		valor: 300000
	},
	{
		id: 'C05',
		nombre: 'Seguridad informatica',
		duracion: 120,
		valor: 500000
	}
];

//Opciones de yargs
const opciones ={
	idCurso:{
		alias:'i',
		demand:true
	},
	nombre:{
		alias:'n',
		demand:true
	},
	cedula:{
		demand:true,
		alias:'c'
	}
};

//Configuracion yargs
const argv = require('yargs')
            .command('inscribir','Inscribir curso',opciones)
            .argv

//Funcion imprimir curso cada dos segundos
let printCurso =(posicionCurso,callback) => {
	setTimeout(function(){
		let resultado =curso[posicionCurso];
	 	callback(resultado);
	}, 2000);
}

//Funcion que manda a llamar para imprimir los cursos
let listarCursos =(cursos) => {	
	if(cursos == curso.length){
		console.log('No existen cursos para mostrar');
		return;
	}
	printCurso(cursos,function(resultado){
		console.log('Id Curso: ' + resultado.id + '\n'
					 + 'Nombre curso: ' + resultado.nombre + '\n'
					 + 'Duracion(Horas): ' + resultado.duracion+ '\n'
					 + 'Valor: $'+ resultado.valor + '\n'
					 + '--------------------------------'+ '\n');
		cursos++;
		listarCursos(cursos);
	});
}

//Funcion para buscar un curso por el Id
function buscar(id){
	let findCurso =	curso.find(oCurso => oCurso.id === id);
	return findCurso;
}


//Funcion para crear archivo de texto
let generarInscripcion =(argv, curso)=>{

	let texto= 'Nombre interesado: ' + argv.n + '\n'+
			   'Cedula interesado: ' + argv.c + '\n' +
			   '-------------------------------' + '\n' +
			   'Información del curso seleccionado '+ '\n' +
			   'Id:' + curso.id + '\n' +
			   'Nombre curso: '+curso.nombre + '\n' +
			   'Duracion(Horas):' + curso.duracion + '\n' +
			   'Valor: $'+curso.valor;

			   fs.writeFile('Inscripcion.txt',texto,(err)=>{
			   		if(err) throw(err);

			   		console.log('La inscripción al curso ' + curso.nombre + ' se realizo correctamente');
			   });
}

//Exportar funciones
module.exports ={
	listarCursos,
	buscar,
	generarInscripcion,
	argv
};

