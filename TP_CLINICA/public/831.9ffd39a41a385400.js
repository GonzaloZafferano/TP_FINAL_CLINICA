"use strict";(self.webpackChunkTP_CLINICA=self.webpackChunkTP_CLINICA||[]).push([[831],{4831:(B,w,f)=>{f.r(w),f.d(w,{MiPerfilModule:()=>Ze});var C=f(6895),F=f(6378),e=f(4650);let Q=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-mi-perfil"]],decls:1,vars:0,template:function(i,o){1&i&&e._UZ(0,"router-outlet")},dependencies:[F.lC]}),r})();var S=f(5861),U=f(3474),q=f(1209),Y=f(6613),P=f(116);let j=(()=>{class r{transform(i){return!Array.isArray(i)||0===i.length||i.sort((o,c)=>o.diaN<c.diaN?-1:o.diaN>c.diaN?1:o.horaInicio<c.horaInicio?-1:o.horaInicio>c.horaInicio?1:0),i}}return r.\u0275fac=function(i){return new(i||r)},r.\u0275pipe=e.Yjl({name:"sortdiashorarios",type:r,pure:!0}),r})();function k(r,a){1&r&&(e.TgZ(0,"div",8)(1,"h3",9),e._uU(2," Cargando... "),e.qZA(),e._UZ(3,"div",10),e.qZA())}function p(r,a){if(1&r&&(e.TgZ(0,"div",21),e._UZ(1,"img",22),e.qZA()),2&r){const i=e.oxw(3);e.xp6(1),e.Q6J("src",null==i.usuario?null:i.usuario.imagen1,e.LSH)}}function s(r,a){if(1&r&&(e.TgZ(0,"div",21),e._UZ(1,"img",23),e.qZA()),2&r){const i=e.oxw(3);e.xp6(1),e.Q6J("src",null==i.usuario?null:i.usuario.imagen2,e.LSH)}}function n(r,a){if(1&r&&(e.TgZ(0,"div",24),e._UZ(1,"img",25),e.qZA()),2&r){const i=e.oxw(3);e.xp6(1),e.Q6J("src",null==i.usuario?null:i.usuario.imagen,e.LSH)}}function l(r,a){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,p,2,1,"div",19),e.YNc(2,s,2,1,"div",19),e.YNc(3,n,2,1,"div",20),e.qZA()),2&r){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.esUsuario),e.xp6(1),e.Q6J("ngIf",i.esUsuario),e.xp6(1),e.Q6J("ngIf",!i.esUsuario)}}function t(r,a){if(1&r&&(e.TgZ(0,"h5"),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&r){const i=a.$implicit;e.xp6(1),e.hij(" ",e.lcZ(2,1,i.nombre)," ")}}function d(r,a){if(1&r&&(e.ynx(0),e.YNc(1,t,3,3,"h5",26),e.BQk()),2&r){const i=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",null==i.usuario?null:i.usuario.especialidades)}}function h(r,a){if(1&r&&(e.TgZ(0,"div",14)(1,"h4"),e._uU(2,"Especialidades:"),e.qZA(),e.YNc(3,d,2,1,"ng-container",17),e.qZA()),2&r){const i=e.oxw(2);e.xp6(3),e.Q6J("ngIf",null==i.usuario?null:i.usuario.especialidades)}}function x(r,a){if(1&r&&(e.TgZ(0,"div")(1,"h5"),e._uU(2),e.ALo(3,"turnos"),e.qZA()()),2&r){const i=a.$implicit;e.xp6(2),e.hij(" ",e.lcZ(3,1,i)," ")}}function y(r,a){if(1&r&&(e.TgZ(0,"div")(1,"h4",28),e._uU(2,"Horarios de atenci\xf3n"),e.qZA(),e.YNc(3,x,4,3,"div",26),e.ALo(4,"sortdiashorarios"),e.qZA()),2&r){const i=e.oxw(3);e.xp6(3),e.Q6J("ngForOf",e.lcZ(4,1,null==i.usuarioObservable?null:i.usuarioObservable.horarios))}}function A(r,a){if(1&r){const i=e.EpF();e.TgZ(0,"div"),e.YNc(1,y,5,3,"div",17),e.TgZ(2,"div")(3,"button",27),e.NdJ("click",function(){e.CHM(i);const c=e.oxw(2);return e.KtG(c.cargarHorarios())}),e._uU(4,"Cargar horarios"),e.qZA()()()}if(2&r){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",(null==i.usuarioObservable?null:i.usuarioObservable.horarios)&&(null==i.usuarioObservable?null:i.usuarioObservable.horarios.length)>0)}}function Z(r,a){if(1&r&&(e.TgZ(0,"div",2)(1,"div",11),e.YNc(2,l,4,3,"div",12),e.qZA(),e.TgZ(3,"div",11)(4,"div",13)(5,"div",14)(6,"h4",15),e._uU(7),e.qZA()(),e.TgZ(8,"div",14)(9,"h4"),e._uU(10),e.qZA()(),e.TgZ(11,"div",14)(12,"h4"),e._uU(13),e.qZA()(),e.TgZ(14,"div",14)(15,"h4"),e._uU(16),e.qZA()(),e.TgZ(17,"div",14)(18,"h4"),e._uU(19),e.qZA()(),e.TgZ(20,"div",14)(21,"h4"),e._uU(22),e.ALo(23,"tipoUsuario"),e.qZA(),e.YNc(24,h,4,1,"div",16),e.qZA(),e.YNc(25,A,5,1,"div",17),e.qZA()()()),2&r){const i=e.oxw();e.xp6(2),e.Q6J("ngIf",null!=i.usuario),e.xp6(5),e.hij("Nombre: ",null==i.usuario?null:i.usuario.nombre,""),e.xp6(3),e.hij("Apellido: ",null==i.usuario?null:i.usuario.apellido,""),e.xp6(3),e.hij("Edad: ",null==i.usuario?null:i.usuario.edad,""),e.xp6(3),e.hij("Email: ",null==i.usuario?null:i.usuario.correo,""),e.xp6(3),e.hij("DNI: ",null==i.usuario?null:i.usuario.dni,""),e.xp6(3),e.hij("Tipo de usuario: ",e.lcZ(23,9,null==i.usuario?null:i.usuario.perfil),""),e.xp6(2),e.Q6J("ngIf",i.esEspecialista),e.xp6(1),e.Q6J("ngIf",i.usuario&&i.esEspecialista)}}let M=(()=>{class r{constructor(i){this.usuarioService=i,this.horarios=[],this.tieneHorarios=!0,this.esAdmin=!1,this.esUsuario=!1,this.esEspecialista=!1,this.especialidad_elegida="0",this.dias_check=[{dia:"lunes",trabaja:!1,ingreso:0,salida:0},{dia:"martes",trabaja:!1,ingreso:0,salida:0},{dia:"mi\xe9rcoles",trabaja:!1,ingreso:0,salida:0},{dia:"jueves",trabaja:!1,ingreso:0,salida:0},{dia:"viernes",trabaja:!1,ingreso:0,salida:0},{dia:"s\xe1bado",trabaja:!1,ingreso:0,salida:0}],this.listaHorarios=["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"],this.listaHorariossalida=["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"]}ngOnInit(){var i=this;return(0,S.Z)(function*(){i.usuario=yield i.usuarioService.obtenerUsuarioActual(),i.usuario&&(i.esAdmin=i.usuario.perfil==U.L.administrador,i.esEspecialista=i.usuario.perfil==U.L.especialista,i.esUsuario=i.usuario.perfil==U.L.paciente),i.suscripcion=i.usuarioService.traerUsuarioPorId_Observable(i.usuario.id).subscribe(o=>{o&&o.length>0&&(i.usuarioObservable=o[0])})})()}cargarHorarios(){}guardar(){this.tieneHorarios&&console.log("tiene horarios previos.->actualizar:: "+this.horariosActuales.doc_id)}capturar(){console.log(this.especialidad_elegida)}}return r.\u0275fac=function(i){return new(i||r)(e.Y36(q.i))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-perfil"]],decls:10,vars:2,consts:[[1,"bg-dark"],[1,"text-center","text-light","custom-font"],[1,"row","w-100"],[1,"col","col-12","col-md-8","mt-5","mx-auto","p-0","m-0"],[1,"card"],[1,"card-body","text-start","fondo"],["class","d-flex justify-content-center","style","align-items: center; height: 100% !important;",4,"ngIf","ngIfElse"],["user",""],[1,"d-flex","justify-content-center",2,"align-items","center","height","100% !important"],[1,"text-dark","fw-bold","fs-1"],[1,"spinner-border","text-dark",2,"align-self","center","scale","1"],[1,"col","col-12","col-md-6"],["class","d-flex justify-content-around imagen-centrada",4,"ngIf"],[2,"padding-left","10px"],[1,"text-start"],[1,"card-title"],["class","text-start",4,"ngIf"],[4,"ngIf"],[1,"d-flex","justify-content-around","imagen-centrada"],["class","text-center p-2",4,"ngIf"],["class","col-md-12 mx-auto mt-2 text-center","style","",4,"ngIf"],[1,"text-center","p-2"],["height","250","width","300px","alt","imagen 1 del usuario",1,"imagen",3,"src"],["height","250","width","300px","alt","imagen 2 del usuario",1,"imagen",3,"src"],[1,"col-md-12","mx-auto","mt-2","text-center"],["height","200","width","400px","alt","imagen 1 del usuario",1,"imagen",3,"src"],[4,"ngFor","ngForOf"],["routerLink","mis-horarios",1,"btn","btn-warning","fw-bold","fs-4",3,"click"],[1,"fw-bold"]],template:function(i,o){if(1&i&&(e.TgZ(0,"div",0)(1,"h3",1),e._uU(2,"Mi Perfil"),e.qZA()(),e.TgZ(3,"div",2)(4,"div",3)(5,"div",4)(6,"div",5),e.YNc(7,k,4,0,"div",6),e.YNc(8,Z,26,11,"ng-template",null,7,e.W1O),e.qZA()()()()),2&i){const c=e.MAs(9);e.xp6(7),e.Q6J("ngIf",!o.usuario)("ngIfElse",c)}},dependencies:[C.sg,C.O5,F.rH,C.rS,Y.q,P._,j],styles:[".imagen[_ngcontent-%COMP%]{border-radius:50%}.fondo[_ngcontent-%COMP%]{background-color:#73c1a7cf}.imagen-centrada[_ngcontent-%COMP%]{display:flex;align-items:center;height:100%}.custom-font[_ngcontent-%COMP%]{font-size:3em!important;font-weight:700!important}"]}),r})();var g=f(4006);class z{constructor(){this.dia="",this.diaN=0,this.fechaString="",this.horaInicio=0,this.horaFin=0,this.comentarioPaciente="",this.comentarioMedico="",this.comentariosExtras="",this.diagnostico="",this.ocupado=!1,this.duracion=0,this.idMedico="",this.nombreEspecialista="",this.idEspecialidad=0,this.especialidad="",this.idPaciente="",this.nombrePaciente=""}}var N=f(5708),G=f(5113),R=f(4465),K=f(9724),X=f(605);let W=(()=>{class r{transform(i){switch(i){case 30:return"00:30";case 45:return"00:45";case 60:return"01:00";case 90:return"01:30";case 120:return"02:00";default:return""}}}return r.\u0275fac=function(i){return new(i||r)},r.\u0275pipe=e.Yjl({name:"duracionAtencion",type:r,pure:!0}),r})();function ee(r,a){if(1&r&&(e.TgZ(0,"option",30),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&r){const i=a.$implicit;e.Q6J("value",null==i?null:i.id),e.xp6(1),e.hij(" ",e.lcZ(2,2,null==i?null:i.nombre)," ")}}function ie(r,a){if(1&r&&(e.TgZ(0,"select",28)(1,"optgroup")(2,"option",13),e._uU(3,"Seleccione especialidad..."),e.qZA(),e._UZ(4,"option",29),e.YNc(5,ee,3,4,"option",14),e.qZA()()),2&r){const i=e.oxw();e.xp6(5),e.Q6J("ngForOf",null==i.usuarioObservable?null:i.usuarioObservable.especialidades)}}function re(r,a){if(1&r&&(e.TgZ(0,"small",32),e._uU(1),e.qZA()),2&r){const i=a.$implicit,o=e.oxw(2);e.xp6(1),e.hij(" ",null==o.selectEspecialidades?null:o.selectEspecialidades.getError(i).mensaje," ")}}function oe(r,a){if(1&r&&(e.ynx(0),e.YNc(1,re,2,1,"small",31),e.BQk()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngForOf",i.obtenerErrores(null==i.selectEspecialidades?null:i.selectEspecialidades.errors))}}function ae(r,a){if(1&r&&(e.TgZ(0,"option",30),e._uU(1),e.qZA()),2&r){const i=a.$implicit;e.Q6J("value",i),e.xp6(1),e.hij(" ",i," ")}}function ne(r,a){if(1&r&&(e.TgZ(0,"small",32),e._uU(1),e.qZA()),2&r){const i=a.$implicit,o=e.oxw(2);e.xp6(1),e.hij(" ",null==o.dia?null:o.dia.getError(i).mensaje," ")}}function te(r,a){if(1&r&&(e.ynx(0),e.YNc(1,ne,2,1,"small",31),e.BQk()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngForOf",i.obtenerErrores(null==i.dia?null:i.dia.errors))}}function se(r,a){if(1&r&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&r){const i=a.$implicit;e.xp6(1),e.hij(" ",i," ")}}function le(r,a){if(1&r&&(e.TgZ(0,"small",32),e._uU(1),e.qZA()),2&r){const i=a.$implicit,o=e.oxw(2);e.xp6(1),e.hij(" ",null==o.horaInicio?null:o.horaInicio.getError(i).mensaje," ")}}function ce(r,a){if(1&r&&(e.ynx(0),e.YNc(1,le,2,1,"small",31),e.BQk()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngForOf",i.obtenerErrores(null==i.horaInicio?null:i.horaInicio.errors))}}function ue(r,a){if(1&r&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&r){const i=a.$implicit;e.xp6(1),e.hij(" ",i," ")}}function de(r,a){if(1&r&&(e.TgZ(0,"small",32),e._uU(1),e.qZA()),2&r){const i=a.$implicit,o=e.oxw(2);e.xp6(1),e.hij(" ",null==o.horaFin?null:o.horaFin.getError(i).mensaje," ")}}function pe(r,a){if(1&r&&(e.ynx(0),e.YNc(1,de,2,1,"small",31),e.BQk()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngForOf",i.obtenerErrores(null==i.horaFin?null:i.horaFin.errors))}}function fe(r,a){if(1&r&&(e.TgZ(0,"option"),e._uU(1),e.ALo(2,"duracionAtencion"),e.qZA()),2&r){const i=a.$implicit;e.xp6(1),e.hij(" ",e.lcZ(2,1,i)," ")}}function he(r,a){if(1&r&&(e.TgZ(0,"small",32),e._uU(1),e.qZA()),2&r){const i=a.$implicit,o=e.oxw(2);e.xp6(1),e.hij(" ",null==o.duracionAtencion?null:o.duracionAtencion.getError(i).mensaje," ")}}function me(r,a){if(1&r&&(e.ynx(0),e.YNc(1,he,2,1,"small",31),e.BQk()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngForOf",i.obtenerErrores(null==i.duracionAtencion?null:i.duracionAtencion.errors))}}function ge(r,a){1&r&&(e.TgZ(0,"div",33)(1,"span",34),e._uU(2,"Cargando..."),e.qZA(),e._UZ(3,"div",35),e.qZA())}function ve(r,a){if(1&r){const i=e.EpF();e.TgZ(0,"div")(1,"div",36)(2,"p",37),e._uU(3),e.ALo(4,"turnos"),e.qZA(),e.TgZ(5,"button",38),e.NdJ("click",function(){const m=e.CHM(i).$implicit,u=e.oxw(2);return e.KtG(u.eliminarTurno(m))}),e._uU(6,"Eliminar"),e.qZA()()()}if(2&r){const i=a.$implicit;e.xp6(3),e.Oqu(e.lcZ(4,1,i))}}function _e(r,a){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,ve,7,3,"div",17),e.ALo(2,"sortdiashorarios"),e.qZA()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngForOf",e.lcZ(2,1,null==i.usuarioObservable?null:i.usuarioObservable.horarios))}}function be(r,a){if(1&r&&e._UZ(0,"app-loader",39),2&r){const i=e.oxw();e.Q6J("texto",i.titulo)}}const xe=[{path:"",component:Q,children:[{path:"",component:M},{path:"mis-horarios",component:(()=>{class r{constructor(i,o,c,m){this.horarioService=i,this.toastService=o,this.swalService=c,this.usuarioService=m,this.titulo="Cargando...",this.horariosActuales=[],this.horariosFinVisibles=[],this.horariosInicioVisibles=[],this.spinner=!1,this.turnos=[],this.cargando=!1,this.duraciones=["",30,45,60,90,120],this.dias=["","Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado"],this.horariosInicio=["","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"],this.horariosFin=["","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"],this.horariosSabadoInicio=["","8:00","9:00","10:00","11:00","12:00","13:00"],this.horariosSabadoFin=["","9:00","10:00","11:00","12:00","13:00","14:00"]}removerSuscripciones(){this.suscripcionMisHorarios&&this.suscripcionMisHorarios.unsubscribe(),this.suscripcionMisTurnosGenerados&&this.suscripcionMisTurnosGenerados.unsubscribe()}ngOnDestroy(){this.removerSuscripciones()}ngOnInit(){var i=this;return(0,S.Z)(function*(){i.validar(),i.usuarioObservable=yield i.usuarioService.obtenerUsuarioActual(),i.suscripcionMisTurnosGenerados=i.horarioService.traerListaDeItemsFiltradaConObservable("idMedico",i.usuarioObservable.id).subscribe(o=>{i.horariosActuales=o}),i.horariosFinVisibles=i.horariosFin,i.horariosInicioVisibles=i.horariosInicio,i.suscripcionMisHorarios=i.usuarioService.traerUsuarioPorId_Observable(i.usuarioObservable.id).subscribe(o=>{o&&o.length>0&&(i.usuarioObservable=o[0])})})()}get dia(){return this.form?.get("dia")}set dia(i){this.form?.get("dia")?.patchValue(i)}get horaInicio(){return this.form?.get("horaInicio")}set horaInicio(i){this.form?.get("horaInicio")?.patchValue(i)}get horaFin(){return this.form?.get("horaFin")}set horaFin(i){this.form?.get("horaFin")?.patchValue(i)}get selectEspecialidades(){return this.form?.get("selectEspecialidades")}set selectEspecialidades(i){this.form?.get("selectEspecialidades")?.patchValue(i)}get duracionAtencion(){return this.form?.get("duracionAtencion")}set duracionAtencion(i){this.form?.get("duracionAtencion")?.patchValue(i)}validar(){this.form=new g.cw({dia:new g.NI("",{validators:[(0,N.qe)()]}),horaInicio:new g.NI("",{validators:[(0,N.qe)()]}),horaFin:new g.NI("",{validators:[(0,N.qe)()]}),selectEspecialidades:new g.NI("",{validators:[(0,N.qe)()]}),duracionAtencion:new g.NI("",{validators:[(0,N.qe)()]})})}obtenerErrores(i){return Object.keys(i)}seleccion(i){i.currentTarget.value.includes("S\xe1bado")?(this.horariosFinVisibles=this.horariosSabadoFin,this.horariosInicioVisibles=this.horariosSabadoInicio):(this.horariosFinVisibles=this.horariosFin,this.horariosInicioVisibles=this.horariosInicio)}guardar(){var i=this;return(0,S.Z)(function*(){if(i.titulo="Cargando...",i.cargando=!0,!i.form.invalid){let o=!0,c=i.dia?.value,m=parseInt(i.horaInicio?.value?.split(":")[0]),u=parseInt(i.horaFin?.value?.split(":")[0]),E=document.getElementById("selectEspecialidades"),I=E?.selectedIndex,J=E?.options[I].text,V=document.getElementById("duracionAtencion")?.selectedIndex,O=i.obtenerDuracionAtencion(V);if(60*(u-m)>=O)if(m<u){for(let _=0;_<i.horariosActuales.length;_++){let v=i.horariosActuales[_];if(v.dia==c&&(v.horaInicio<u&&v.horaInicio>m||v.horaFin<u&&v.horaFin>m||v.horaFin==u&&v.horaInicio==m)){i.toastService.error(`Error. Conflicto con el horario. <br> Ya existe un horario:<br>${v.dia} - ${v.horaInicio}:00 - ${v.horaFin}:00<br>Un horario no puede incluir a otro existente.`,"Aviso.",4e3),o=!1;break}}if(o){yield i.generarFechasParaTurnos(J,c,m,u,O),i.usuarioObservable.horarios||(i.usuarioObservable.horarios=[]);let _=-1;switch(c.toLowerCase()){case"lunes":_=1;break;case"martes":_=2;break;case"mi\xe9rcoles":_=3;break;case"jueves":_=4;break;case"viernes":_=5;break;case"s\xe1bado":_=6}Math.floor(60*(u-m)/O),i.usuarioObservable.horarios.push({dia:c,diaN:_,duracionAtencion:O,horaInicio:m,horaFin:u,especialidad:J}),i.usuarioService.modificarUsuario(i.usuarioObservable),i.limpiarSelects(),i.swalService.exito("Se ha guardado el horario con exito! Tambi\xe9n se han generado los turnos en base a su disponibilidad horaria y duraci\xf3n de atenci\xf3n.","Aviso."),i.cargando=!1}}else i.toastService.error("La hora de inicio no puede ser mayor o igual que la hora fin.","Aviso.");else i.toastService.error("La duraci\xf3n de atencion NO puede ser mayor que su disponibilidad horaria.","Aviso.")}i.cargando=!1})()}limpiarSelects(){this.horaFin="",this.dia="",this.horaInicio="",this.selectEspecialidades="",this.duracionAtencion=""}generarFechasParaTurnos(i,o,c,m,u){var E=this;return(0,S.Z)(function*(){let I=-1;switch(o.toLowerCase()){case"lunes":I=1;break;case"martes":I=2;break;case"mi\xe9rcoles":I=3;break;case"jueves":I=4;break;case"viernes":I=5;break;case"s\xe1bado":I=6}let T=new Date(new Date),V=Math.floor(60*(m-c)/u);for(let O=0;O<4;O++){T.setDate(T.getDate()+(I-T.getDay()+7)%7);let L=T.toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"numeric"}),_=L.split("/"),v=new Date(parseInt(_[2]),parseInt(_[1])-1,parseInt(_[0]),c),H=new Date;if(v.getDate()!=H.getDate()||v.getMonth()!=H.getMonth()){for(let D=0;D<V;D++){let b=new z;b.fechaString=L,b.dia=o,b.diaN=I,b.horaFin=m,b.horaInicio=c,b.idEspecialidad=E.selectEspecialidades?.value,b.especialidad=i,b.nombreEspecialista=E.usuarioObservable?.apellido+" "+E.usuarioObservable?.nombre,b.medico=E.usuarioObservable,b.idMedico=E.usuarioObservable.id,b.estadoTurno="Libre",b.duracion=u;let $=v;0!=D&&$.setMinutes(v.getMinutes()+u),b.fechaDate=$,yield E.horarioService.cargarItemSinIdAsignado(b)}T.setDate(T.getDate()+7)}else O--,T.setDate(T.getDate()+7)}})()}eliminarTurno(i){var o=this;return(0,S.Z)(function*(){o.cargando=!0,o.titulo="Eliminando...";let c=o.horariosActuales.filter(u=>u.dia==i.dia&&u.horaFin==i.horaFin&&u.horaInicio==i.horaInicio);if(c.filter(u=>1==u.ocupado&&("Aceptado"==u.estadoTurno||"Solicitado"==u.estadoTurno)).length>0)o.swalService.error("Tiene turnos Aceptados o Solicitados en el horario que quiere borrar. Primero, cancele, rechace o finalice los turnos y vuelva a intentar.","Aviso"),o.cargando=!1;else{for(let u=0;u<c.length;u++)c[u].ocupado||(yield o.horarioService.eliminarItem(c[u].id));o.usuarioObservable.horarios=o.usuarioObservable.horarios.filter(u=>u!=i),o.usuarioService.modificarUsuario(o.usuarioObservable).then(u=>{o.swalService.exito("Se han eliminado los horarios y turnos asociados!","Aviso"),o.cargando=!1}).finally(()=>{o.cargando=!1})}})()}obtenerDuracionAtencion(i){return i>0?this.duraciones[i-1]:30}}return r.\u0275fac=function(i){return new(i||r)(e.Y36(G.p),e.Y36(R.k),e.Y36(K.J),e.Y36(q.i))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-cargar-horarios"]],decls:63,vars:15,consts:[[1,"bg-dark","text-light","fw-bold","p-2","text-center"],[1,"fs-1","fw-bold"],[1,"d-flex","justify-content-around","w-100"],[1,"w-50"],[1,"bg-light","p-2",2,"margin-left","10px"],[3,"formGroup"],[1,"mt-3"],["for","selectEspecialidades",1,"form-label"],["class","w-100 form-select","name","selectEspecialidades","id","selectEspecialidades","formControlName","selectEspecialidades",4,"ngIf"],[4,"ngIf"],[1,"d-flex",2,"flex-direction","column"],["for","dia",1,"form-label"],["name","dia","id","dia","formControlName","dia",1,"w-100","form-select",3,"change"],["selected","","disabled","","value","-1"],[3,"value",4,"ngFor","ngForOf"],["for","horaInicio",1,"form-label"],["name","horaInicio","id","horaInicio","formControlName","horaInicio",1,"w-100","form-select"],[4,"ngFor","ngForOf"],["for","horaFin",1,"form-label"],["name","horaFin","id","horaFin","formControlName","horaFin",1,"w-100","form-select"],["for","duracionAtencion",1,"form-label"],["name","duracionAtencion","id","duracionAtencion","formControlName","duracionAtencion",1,"w-100","form-select"],[2,"display","flex","justify-content","end"],[1,"btn","btn-success","fs-4","fw-bold","p-2","m-2",3,"disabled","click"],[1,"border","p-2","w-75","mx-5","bg-dark","text-light"],["class","d-flex justify-content-around",4,"ngIf","ngIfElse"],["lista",""],[3,"texto",4,"ngIf"],["name","selectEspecialidades","id","selectEspecialidades","formControlName","selectEspecialidades",1,"w-100","form-select"],["selected","","value","0"],[3,"value"],["class","d-block error",4,"ngFor","ngForOf"],[1,"d-block","error"],[1,"d-flex","justify-content-around"],[1,"fs-3","fw-bold"],[1,"spinner-border","text-danger","text-center",2,"align-self","center","scale","1.2"],[1,"d-flex","justify-content-between","mx-0","border","bg-light","text-dark","paises"],[1,"m-2"],[1,"btn","btn-danger",3,"click"],[3,"texto"]],template:function(i,o){if(1&i&&(e.TgZ(0,"div",0)(1,"h3",1),e._uU(2,"Carga de Horarios"),e.qZA()(),e.TgZ(3,"div",2)(4,"div",3)(5,"div",4)(6,"form",5)(7,"div")(8,"div",6)(9,"label",7),e._uU(10,"Seleccione especialidad"),e.qZA(),e.YNc(11,ie,6,1,"select",8),e.qZA(),e.YNc(12,oe,2,1,"ng-container",9),e.qZA(),e.TgZ(13,"div",10)(14,"div")(15,"div")(16,"label",11),e._uU(17,"Seleccione d\xeda"),e.qZA(),e.TgZ(18,"select",12),e.NdJ("change",function(m){return o.seleccion(m)}),e.TgZ(19,"optgroup")(20,"option",13),e._uU(21,"Seleccione d\xeda..."),e.qZA(),e.YNc(22,ae,2,2,"option",14),e.qZA()()(),e.YNc(23,te,2,1,"ng-container",9),e.qZA(),e.TgZ(24,"div")(25,"div")(26,"label",15),e._uU(27,"Seleccione hora inicial"),e.qZA(),e.TgZ(28,"select",16)(29,"optgroup")(30,"option",13),e._uU(31,"Seleccione hora inicial..."),e.qZA(),e.YNc(32,se,2,1,"option",17),e.qZA()()(),e.YNc(33,ce,2,1,"ng-container",9),e.qZA(),e.TgZ(34,"div")(35,"label",18),e._uU(36,"Seleccione hora final"),e.qZA(),e.TgZ(37,"select",19)(38,"optgroup")(39,"option",13),e._uU(40,"Seleccione hora final..."),e.qZA(),e.YNc(41,ue,2,1,"option",17),e.qZA()(),e.YNc(42,pe,2,1,"ng-container",9),e.qZA(),e.TgZ(43,"div")(44,"label",20),e._uU(45,"Seleccione duraci\xf3n"),e.qZA(),e.TgZ(46,"select",21)(47,"optgroup")(48,"option",13),e._uU(49,"Seleccione duraci\xf3n..."),e.qZA(),e.YNc(50,fe,3,3,"option",17),e.qZA()(),e.YNc(51,me,2,1,"ng-container",9),e.qZA(),e.TgZ(52,"div",22)(53,"button",23),e.NdJ("click",function(){return o.guardar()}),e._uU(54,"Cargar"),e.qZA()()()()()(),e.TgZ(55,"div",3)(56,"div",24)(57,"h3"),e._uU(58,"Horarios"),e.qZA(),e.YNc(59,ge,4,0,"div",25),e.YNc(60,_e,3,3,"ng-template",null,26,e.W1O),e.qZA()()(),e.YNc(62,be,1,1,"app-loader",27)),2&i){const c=e.MAs(61);e.xp6(6),e.Q6J("formGroup",o.form),e.xp6(5),e.Q6J("ngIf",null==o.usuarioObservable?null:o.usuarioObservable.especialidades),e.xp6(1),e.Q6J("ngIf",null==o.selectEspecialidades?null:o.selectEspecialidades.errors),e.xp6(10),e.Q6J("ngForOf",o.dias),e.xp6(1),e.Q6J("ngIf",null==o.dia?null:o.dia.errors),e.xp6(9),e.Q6J("ngForOf",o.horariosInicioVisibles),e.xp6(1),e.Q6J("ngIf",null==o.horaInicio?null:o.horaInicio.errors),e.xp6(8),e.Q6J("ngForOf",o.horariosFinVisibles),e.xp6(1),e.Q6J("ngIf",null==o.horaFin?null:o.horaFin.errors),e.xp6(8),e.Q6J("ngForOf",o.duraciones),e.xp6(1),e.Q6J("ngIf",null==o.duracionAtencion?null:o.duracionAtencion.errors),e.xp6(2),e.Q6J("disabled",o.form.invalid),e.xp6(6),e.Q6J("ngIf",o.spinner)("ngIfElse",c),e.xp6(3),e.Q6J("ngIf",o.cargando)}},dependencies:[C.sg,C.O5,X.R,g._Y,g.YN,g.Kr,g.EJ,g.JJ,g.JL,g.sg,g.u,C.rS,P._,j,W],styles:[".error[_ngcontent-%COMP%]{color:red}"]}),r})(),canActivate:[(()=>{class r{constructor(i,o){this.usuarioService=i,this.router=o}canActivate(i,o){return!(!this.usuarioService.getUsuarioActualBasico||this.usuarioService.getUsuarioActualBasico.perfil!=U.L.especialista)||(this.router.navigate(["home"]),!1)}canActivateChild(i,o){return!0}canDeactivate(i,o,c,m){return!0}}return r.\u0275fac=function(i){return new(i||r)(e.LFG(q.i),e.LFG(F.F0))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()]}]}];let Ae=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[F.Bz.forChild(xe),F.Bz]}),r})();var Ce=f(4466);let Ze=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[C.ez,Ae,Ce.m,g.u5,g.UX]}),r})()},5708:(B,w,f)=>{f.d(w,{$k:()=>e,FQ:()=>P,Ms:()=>F,U5:()=>S,j8:()=>q,qc:()=>Q,qe:()=>j,sH:()=>Y,wb:()=>k,y$:()=>U});var C=f(4004);function F(p,s,n=null){return l=>{const t=l,d={};return""==t?.value||null==t?.value||null==t?.value?d.campoVacio={hayError:!0,mensaje:null!=n&&null!=n.campoVacio?n.campoVacio:"Campo requerido."}:isNaN(t?.value)||t?.value?.includes(".")||t?.value?.includes(",")?d.textoInvalido={hayError:!0,mensaje:null!=n&&null!=n.textoInvalido?n.textoInvalido:"Solo se pueden ingresar caracteres num\xe9ricos."}:(t?.value<p||t?.value>s)&&(d.valorInvalido={hayError:!0,mensaje:null!=n&&null!=n.valorInvalido?n.valorInvalido:`Solo se admiten valores entre ${p} y ${s}.`}),Object.keys(d).length?(t?.setErrors(d),d):(t?.setErrors(null),null)}}function e(p,s,n=null,l=!1,t=!0){return d=>{const h=d,x={};let y=null==h?.value||null==h?.value||""==h?.value.trim();return y?x.campoVacio={hayError:!0,mensaje:null!=n&&null!=n.campoVacio?n.campoVacio:"Campo requerido."}:h?.value.length<p?x.lenMinimo={hayError:!0,mensaje:null!=n&&null!=n.lenMinimo?n.lenMinimo:`Solo se admite un m\xednimo de ${p} caracteres.`}:h?.value.length>s&&(x.lenMaximo={hayError:!0,mensaje:null!=n&&null!=n.lenMaximo?n.lenMaximo:`Solo se admite un m\xe1ximo de ${s} caracteres.`}),l?!y&&!(t?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(h.value)&&(x.textoInvalido={hayError:!0,mensaje:null!=n&&null!=n.textoInvalido?n.textoInvalido:`Solo se admiten letras a-z ${t?"":"(sin espacios)"}.`}):t||!y&&/\s/.test(h.value)&&(x.textoInvalido={hayError:!0,mensaje:null!=n&&null!=n.textoInvalido?n.textoInvalido:"No se admiten espacios."}),Object.keys(x).length?(h?.setErrors(x),x):(h?.setErrors(null),null)}}function Q(){return p=>{const s=p,l={};return null==s?.value||null==s?.value||""==s?.value.trim()?l.campoVacio={hayError:!0,mensaje:"Campo requerido."}:/^([a-zA-Z0-9_\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/.test(p.value)||(l.formatoInvalido={hayError:!0,mensaje:"El formato de correo electr\xf3nico es invalido. "}),Object.keys(l).length?(s?.setErrors(l),l):(s?.setErrors(null),null)}}function S(p){return s=>{const n=s.get("clave"),l=s.get("confirmarClave"),t={};return n?.value!==l?.value&&(t.clavesDistintas={hayError:!0,mensaje:"Las clave y confirmaci\xf3n NO conciden."}),null==l?.value||null==l?.value||""==l?.value.trim()?t.campoVacio={hayError:!0,mensaje:"Campo requerido."}:l?.value.length<p&&(t.longitudInvalida={hayError:!0,mensaje:`La confirmaci\xf3n de clave debe contener por lo menos ${p} caracteres. \n`}),Object.keys(t).length?(l?.setErrors(t),t):(l?.setErrors(null),null)}}function U(p,s,n){return l=>{s.validando=!0;const t=n.eliminarEspaciosYPasarAMin_May(l.value),d={};return p.traerListaDeCorreosFiltradaConObservable(t).pipe((0,C.U)(h=>h.length>0&&(d.datoExistente={hayError:!0,mensaje:"El correo electr\xf3nico ingresado ya existe."},Object.keys(d).length)?(l?.setErrors(d),s.validando=!1,d):(l?.setErrors(null),s.validando=!1,null)))}}function q(p,s){return n=>{s.validando=!0;const t={};return p.traerListaDeDniFiltradaConObservable(n.value).pipe((0,C.U)(d=>d.length>0&&(t.datoExistente={hayError:!0,mensaje:"El dni ingresado ya se encuentra cargado en el sistema."},Object.keys(t).length)?(n?.setErrors(t),s.validando=!1,t):(n?.setErrors(null),s.validando=!1,null)))}}function Y(p,s,n){return l=>{s.validando=!0;const t=n.eliminarEspaciosYPasarAMin_May(l.value),d={};return p.traerListaDeEspecialidadesFiltradaConObservable(t).pipe((0,C.U)(h=>h.length>0&&(d.datoExistente={hayError:!0,mensaje:"La especialidad ingresada ya existe."},Object.keys(d).length)?(l?.setErrors(d),s.validando=!1,d):l?.errors?(s.validando=!1,l?.errors):(l?.setErrors(null),s.validando=!1,null)))}}function P(){return p=>{const s=p,n={};if(""==s?.value||null==s?.value||null==s?.value)n.campoVacio={hayError:!0,mensaje:"Campo requerido."};else{var l=s?.value,t=l.lastIndexOf(".")+1,d=l.substr(t,l.length).toLowerCase();"jpg"!=d&&"jpeg"!=d&&"png"!=d&&(n.archivoInvalido={hayError:!0,mensaje:"Solo se admiten archivos de tipo jpg | jpeg | png."})}return Object.keys(n).length?(s?.setErrors(n),n):(s?.setErrors(null),null)}}function j(){return p=>{const s=p,n=[];return(""==s?.value||null==s?.value||null==s?.value||-1==s?.value)&&(n.campoVacio={hayError:!0,mensaje:"Campo requerido."}),Object.keys(n).length?(s?.setErrors(n),n):(s?.setErrors(null),null)}}function k(p,s,n,l,t=null,d=!1,h=!0){return x=>{const y=x.get(n),A=x.get(l);if(y&&y.value){const Z={};let M=null==A?.value||null==A?.value||""==A?.value.trim();if(M?Z.campoVacio={hayError:!0,mensaje:null!=t&&null!=t.campoVacio?t.campoVacio:"Campo requerido."}:A?.value.length<p?Z.lenMinimo={hayError:!0,mensaje:null!=t&&null!=t.lenMinimo?t.lenMinimo:`Solo se admite un m\xednimo de ${p} caracteres.`}:A?.value.length>s&&(Z.lenMaximo={hayError:!0,mensaje:null!=t&&null!=t.lenMaximo?t.lenMaximo:`Solo se admite un m\xe1ximo de ${s} caracteres.`}),d?!M&&!(h?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(A?.value)&&(Z.textoInvalido={hayError:!0,mensaje:null!=t&&null!=t.textoInvalido?t.textoInvalido:`Solo se admiten letras a-z ${h?"":"(sin espacios)"}.`}):h||!M&&/\s/.test(A?.value)&&(Z.textoInvalido={hayError:!0,mensaje:null!=t&&null!=t.textoInvalido?t.textoInvalido:"No se admiten espacios."}),Object.keys(Z).length)return A?.setErrors(Z),Z}return A?.setErrors(null),null}}}}]);