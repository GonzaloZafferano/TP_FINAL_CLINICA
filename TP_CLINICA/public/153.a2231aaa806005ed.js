"use strict";(self.webpackChunkTP_CLINICA=self.webpackChunkTP_CLINICA||[]).push([[153],{4153:(M,x,r)=>{r.r(x),r.d(x,{UsuariosModule:()=>me});var f=r(6895),U=r(155),m=r(5861),_=r(3474),e=r(4650),u=r(1209),C=r(6581),T=r(605),A=r(107),E=r(3389),g=r(4500),c=r(6069),d=r(7556);let h=(()=>{class t{transform(i){return i==g.j.espera?"En espera":i==g.j.habilitado?"Habilitado":"Rechazado"}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275pipe=e.Yjl({name:"estados",type:t,pure:!0}),t})();var v=r(6613);function b(t,a){if(1&t&&(e.TgZ(0,"div",2)(1,"span",3),e._uU(2,"Cargando..."),e.qZA(),e._UZ(3,"div",4),e.qZA()),2&t){const i=e.oxw();e.Akn(i.anchoSpinner)}}function O(t,a){1&t&&(e.TgZ(0,"h3",19),e._uU(1,"No se puede habilitar/deshabilitar a si mismo."),e.qZA())}function j(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"div",7)(1,"div",8)(2,"h3",9),e._uU(3," Detalles Usuario "),e.qZA()(),e.TgZ(4,"div",5),e._UZ(5,"img",10),e.qZA(),e.TgZ(6,"div",11)(7,"div",5)(8,"div")(9,"div",12)(10,"h5",13),e._uU(11),e.qZA()(),e.TgZ(12,"div",12)(13,"h5",13),e._uU(14),e.qZA()(),e.TgZ(15,"div",12)(16,"h5",13),e._uU(17),e.qZA()(),e.TgZ(18,"div",12)(19,"h5",13),e._uU(20),e.ALo(21,"estados"),e.qZA()(),e.TgZ(22,"div",12)(23,"h5",13),e._uU(24),e.ALo(25,"tipoUsuario"),e.qZA()()()(),e.TgZ(26,"div",14)(27,"div"),e.YNc(28,O,2,0,"h3",15),e.qZA(),e.TgZ(29,"div",16)(30,"button",17),e.NdJ("click",function(){e.CHM(i);const n=e.oxw(2);return e.KtG(n.deshabilitar(n.usuario))}),e._uU(31,"Deshabilitar"),e.qZA(),e.TgZ(32,"button",18),e.NdJ("click",function(){e.CHM(i);const n=e.oxw(2);return e.KtG(n.habilitar(n.usuario))}),e._uU(33,"Habilitar"),e.qZA()()()()()}if(2&t){const i=e.oxw(2);e.xp6(5),e.Q6J("src",i.obtenerUrlImagen(i.usuario),e.LSH),e.xp6(6),e.AsE("Nombre: ",null==i.usuario?null:i.usuario.nombre," ",null==i.usuario?null:i.usuario.apellido,""),e.xp6(3),e.hij("Edad: ",null==i.usuario?null:i.usuario.edad," a\xf1os"),e.xp6(3),e.hij("Dni: ",null==i.usuario?null:i.usuario.dni,""),e.xp6(3),e.hij("Estado: ",e.lcZ(21,10,null==i.usuario?null:i.usuario.habilitado),""),e.xp6(4),e.hij("Perfil: ",e.lcZ(25,12,null==i.usuario?null:i.usuario.perfil),""),e.xp6(4),e.Q6J("ngIf",i.esUsuarioActual(i.usuario)),e.xp6(2),e.Q6J("disabled",!i.estaHabilitado(i.usuario)||i.esUsuarioActual(i.usuario)),e.xp6(2),e.Q6J("disabled",i.estaHabilitado(i.usuario)||i.esUsuarioActual(i.usuario))}}function P(t,a){if(1&t&&(e.TgZ(0,"div",5),e.YNc(1,j,34,14,"div",6),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.usuario)}}let I=(()=>{class t{constructor(i,o,n){this.formateo=i,this.authService=o,this.usuarioService=n,this.spinner=!1}obtenerUrlImagen(i){return i.perfil!=_.L.paciente?i.imagen:i.imagen1}esUsuarioActual(i){return!this.usuarioService.getUsuarioActualBasico||this.usuarioService.getUsuarioActualBasico.id==i.id}estaHabilitado(i){return i.habilitado==g.j.habilitado}deshabilitar(i){this.estaHabilitado(i)&&(i.habilitado=g.j.rechazado,this.usuarioService.modificarUsuario(i))}habilitar(i){this.estaHabilitado(i)||(i.habilitado=g.j.habilitado,this.usuarioService.modificarUsuario(i))}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(c.y),e.Y36(d.e),e.Y36(u.i))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-usuarios-detalles"]],inputs:{spinner:"spinner",anchoSpinner:"anchoSpinner",usuario:"usuario"},decls:4,vars:2,consts:[["class","d-flex justify-content-around",3,"style",4,"ngIf","ngIfElse"],["detalleUsuario",""],[1,"d-flex","justify-content-around"],[1,"fs-3","fw-bold"],[1,"spinner-border","text-danger","text-center",2,"align-self","center","scale","1.2"],[1,"d-flex","justify-content-center"],["style","height: 100% !important;","class","card ancho",4,"ngIf"],[1,"card","ancho",2,"height","100% !important"],[1,"card-header","bg-dark","text-light"],[1,"card-title"],["alt","imagen usuario",1,"card-img-top","imagen-usuario",3,"src"],[1,"card-body"],[1,"d-flex"],[1,""],[1,"d-flex",2,"align-items","center","flex-direction","column"],["class","texto text-center fw-bold text-danger",4,"ngIf"],[1,"d-flex","justify-content-around","w-100"],[1,"btn","btn-danger","p-2","m-2","fs-4","fw-bold",3,"disabled","click"],[1,"btn","btn-success","p-2","m-2","fs-4","fw-bold",3,"disabled","click"],[1,"texto","text-center","fw-bold","text-danger"]],template:function(i,o){if(1&i&&(e.ynx(0),e.YNc(1,b,4,2,"div",0),e.YNc(2,P,2,1,"ng-template",null,1,e.W1O),e.BQk()),2&i){const n=e.MAs(3);e.xp6(1),e.Q6J("ngIf",o.spinner)("ngIfElse",n)}},dependencies:[f.O5,h,v.q],styles:[".imagen-usuario[_ngcontent-%COMP%]{border-radius:100px;width:200px;height:200px}.texto[_ngcontent-%COMP%]{word-wrap:break-word}.ancho[_ngcontent-%COMP%]{width:90%}@media (min-width: 600px){.ancho[_ngcontent-%COMP%]{width:50%}}"]}),t})(),S=(()=>{class t{constructor(i){this.formato=i}transform(i){if(i){let o=i.toDate();return this.formato.fechaToString(o,!1,!1)}return""}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(c.y,16))},t.\u0275pipe=e.Yjl({name:"fechaString",type:t,pure:!0}),t})();function q(t,a){1&t&&(e.TgZ(0,"div",1)(1,"span",13),e._uU(2,"Cargando..."),e.qZA(),e._UZ(3,"div",14),e.qZA())}function D(t,a){if(1&t){const i=e.EpF();e.ynx(0),e.TgZ(1,"button",26),e.NdJ("click",function(){e.CHM(i);const n=e.oxw(2).$implicit,s=e.oxw(2);return e.KtG(s.mostrarHistoria(n))}),e._uU(2,"Ver Historia Cl\xednica"),e.qZA(),e.BQk()}}function F(t,a){1&t&&(e.TgZ(0,"h3",27),e._uU(1,"Sin historia Cl\xednica"),e.qZA())}function N(t,a){if(1&t&&(e.ynx(0),e.YNc(1,D,3,0,"ng-container",23),e.YNc(2,F,2,0,"ng-template",null,25,e.W1O),e.BQk()),2&t){const i=e.MAs(3),o=e.oxw().$implicit;e.xp6(1),e.Q6J("ngIf",o.tieneHC)("ngIfElse",i)}}function H(t,a){1&t&&(e.TgZ(0,"h3",27),e._uU(1,"-"),e.qZA())}function J(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"div",16),e.NdJ("click",function(){const s=e.CHM(i).$implicit,p=e.oxw(2);return e.KtG(p.seleccionDeFila(s))}),e.TgZ(1,"div",5),e._uU(2),e.qZA(),e.TgZ(3,"div",17)(4,"p"),e._uU(5),e.qZA()(),e.TgZ(6,"div",17)(7,"p"),e._uU(8),e.qZA()(),e.TgZ(9,"div",17)(10,"p"),e._uU(11),e.qZA()(),e.TgZ(12,"div",17)(13,"p"),e._uU(14),e.qZA()(),e.TgZ(15,"div",17)(16,"p"),e._uU(17),e.ALo(18,"tipoUsuario"),e.qZA()(),e.TgZ(19,"div",18)(20,"p"),e._uU(21),e.qZA()(),e.TgZ(22,"div",19)(23,"p"),e._uU(24),e.ALo(25,"fechaString"),e.qZA()(),e.TgZ(26,"div",20)(27,"div",1),e._UZ(28,"img",21),e.qZA()(),e.TgZ(29,"div",19)(30,"p"),e._uU(31),e.ALo(32,"estados"),e.qZA()(),e.TgZ(33,"div",22),e.YNc(34,N,4,2,"ng-container",23),e.YNc(35,H,2,0,"ng-template",null,24,e.W1O),e.qZA()()}if(2&t){const i=a.$implicit,o=e.MAs(36),n=e.oxw(2);e.ekj("fila-seleccionada",null!=n.filaSeleccionada&&i.id===n.filaSeleccionada.id),e.Q6J("appResaltador","green"),e.xp6(2),e.hij(" ",i.id," "),e.xp6(3),e.hij(" ",i.nombre," "),e.xp6(3),e.hij(" ",i.apellido," "),e.xp6(3),e.hij(" ",i.edad," "),e.xp6(3),e.hij(" ",i.dni," "),e.xp6(3),e.hij(" ",e.lcZ(18,15,i.perfil)," "),e.xp6(4),e.hij(" ",i.correo," "),e.xp6(3),e.hij(" ",e.lcZ(25,17,i.fechaRegistro)," "),e.xp6(4),e.Q6J("src",n.obtenerUrlImagen(i),e.LSH),e.xp6(3),e.hij(" ",e.lcZ(32,19,i.habilitado)," "),e.xp6(3),e.Q6J("ngIf",1==i.perfil)("ngIfElse",o)}}function Y(t,a){if(1&t&&e.YNc(0,J,37,21,"div",15),2&t){const i=e.oxw();e.Q6J("ngForOf",i.listado)}}function k(t,a){1&t&&e._UZ(0,"app-loader")}function z(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"app-historia",28),e.NdJ("OnCerrar",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.cerrarHC())}),e.qZA()}if(2&t){const i=e.oxw();e.Q6J("historia",i.historiaClinica)}}let Q=(()=>{class t{constructor(i,o){this.usuarioService=i,this.historiaService=o,this.listado=[],this.spinner=!1,this.cargando=!1,this.mostrarHC=!1}ngOnInit(){this.obtenerUsuarios()}ngOnDestroy(){this.suscripcion&&this.suscripcion.unsubscribe(),this.suscripcionEnEspera&&this.suscripcionEnEspera.unsubscribe()}obtenerUsuarios(){var i=this;return(0,m.Z)(function*(){i.spinner=!0,i.suscripcion&&i.suscripcion.unsubscribe(),i.suscripcion=i.usuarioService.obtenerListadoDeUsuariosObservable().subscribe(o=>{i.spinner=!0,i.listado=o,i.spinner=!1})})()}seleccionDeFila(i){this.filaSeleccionada=i}obtenerUrlImagen(i){return i.perfil!=_.L.paciente?i.imagen:i.imagen1}cerrarHC(){this.cargando=!1,this.mostrarHC=!1}mostrarHistoria(i){var o=this;return(0,m.Z)(function*(){o.cargando=!0;let n=yield o.historiaService.traerListaFiltradaPor_UN_Campo("pacienteId",i.id);n&&n.length>0?(o.historiaClinica=n[0],o.mostrarHC=!0):o.cerrarHC()})()}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(u.i),e.Y36(C.T))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-listado-usuarios"]],decls:43,vars:5,consts:[[1,"container-fluid","bg-light"],[1,"d-flex","justify-content-center"],[1,"w-75"],[3,"usuario"],[1,"row","bg-dark","text-light","text-center"],[1,"col","col","border","d-none"],[1,"custom-font-headers"],[1,"col","col-12","col-xl-1","border"],[1,"col","col-12","col-xl-2","border"],["class","d-flex justify-content-center",4,"ngIf","ngIfElse"],["lista",""],[4,"ngIf"],[3,"historia","OnCerrar",4,"ngIf"],[1,"m-3","fs-3","fw-bold"],[1,"spinner-border","text-danger",2,"align-self","center","scale","1.2"],["class","row",3,"appResaltador","fila-seleccionada","click",4,"ngFor","ngForOf"],[1,"row",3,"appResaltador","click"],[1,"col","col-12","col-xl-1","border","custom-font-data","columna"],[1,"col","col-12","col-xl-2","border","custom-font-data","text-right","columna"],[1,"col","col-12","col-xl-1","border","custom-font-data","text-right","columna"],[1,"col","col-12","col-xl-2","border","custom-font-data","text-right","justify-content-center","columna"],["alt","imagen usuario",1,"imagen-usuario",3,"src"],[1,"col","col-12","col-xl-1","border","d-flex",2,"align-items","center","justify-content","center"],[4,"ngIf","ngIfElse"],["sinHC",""],["pacienteSinHC",""],[1,"btn","btn-primary","fs-4","fw-bold","p-2","m-2",3,"click"],[1,"custom-font-headers","text-center"],[3,"historia","OnCerrar"]],template:function(i,o){if(1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"app-usuarios-detalles",3),e.qZA()(),e.TgZ(4,"div",4)(5,"div",5)(6,"h3",6),e._uU(7,"Id"),e.qZA()(),e.TgZ(8,"div",7)(9,"h3",6),e._uU(10,"Nombre"),e.qZA()(),e.TgZ(11,"div",7)(12,"h3",6),e._uU(13,"Apellido"),e.qZA()(),e.TgZ(14,"div",7)(15,"h3",6),e._uU(16,"Edad"),e.qZA()(),e.TgZ(17,"div",7)(18,"h3",6),e._uU(19,"Dni"),e.qZA()(),e.TgZ(20,"div",7)(21,"h3",6),e._uU(22,"Tipo Usuario"),e.qZA()(),e.TgZ(23,"div",8)(24,"h3",6),e._uU(25,"Correo"),e.qZA()(),e.TgZ(26,"div",7)(27,"h3",6),e._uU(28,"Registro"),e.qZA()(),e.TgZ(29,"div",8)(30,"h3",6),e._uU(31,"Imagen"),e.qZA()(),e.TgZ(32,"div",7)(33,"h3",6),e._uU(34,"Estado"),e.qZA()(),e.TgZ(35,"div",7)(36,"h3",6),e._uU(37,"Historia Cl\xednica"),e.qZA()()(),e.YNc(38,q,4,0,"div",9),e.YNc(39,Y,1,1,"ng-template",null,10,e.W1O),e.qZA(),e.YNc(41,k,1,0,"app-loader",11),e.YNc(42,z,1,1,"app-historia",12)),2&i){const n=e.MAs(40);e.xp6(3),e.Q6J("usuario",o.filaSeleccionada),e.xp6(35),e.Q6J("ngIf",o.spinner)("ngIfElse",n),e.xp6(3),e.Q6J("ngIf",o.cargando),e.xp6(1),e.Q6J("ngIf",o.mostrarHC)}},dependencies:[f.sg,f.O5,T.R,A.N,E.j,I,h,S,v.q],styles:[".custom-font-headers[_ngcontent-%COMP%]{font-size:1.4em!important;font-weight:700!important}.custom-font-data[_ngcontent-%COMP%]{font-size:1.03em!important;word-wrap:break-word;font-weight:700}.fila-seleccionada[_ngcontent-%COMP%]{background-color:#009331!important;color:#fff!important;font-weight:700!important;.nueva-especialidad {color: black !important;}}.custom-font[_ngcontent-%COMP%]{font-size:3em!important;font-weight:700!important}img[_ngcontent-%COMP%]{height:100px}.imagen-usuario[_ngcontent-%COMP%]{border-radius:100px;width:100px}.textarea[_ngcontent-%COMP%]{resize:none;height:100%}.nueva-especialidad[_ngcontent-%COMP%]{color:red;font-weight:bolder;font-size:1.03em}.columna[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center!important}"]}),t})();var B=r(1588),w=r(9215),R=r(2668),y=r(4465);let G=(()=>{class t{transform(i){let o="",n="",s="";if(i.especialidades.length>0){o="Especialidades declaradas: ";for(let p of i.especialidades)n+=""!=n?"/"+p.nombre:p.nombre}return o=o+" "+(""!=n?n:" - "),""!=i.otroEspecialidad&&(s+="Especialidad NUEVA: "+i.otroEspecialidad),[o,s]}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275pipe=e.Yjl({name:"especialidades",type:t,pure:!0}),t})();function K(t,a){1&t&&(e.TgZ(0,"div",8)(1,"span",9),e._uU(2,"Cargando..."),e.qZA(),e._UZ(3,"div",10),e.qZA())}const $=function(t){return{"nueva-especialidad":t}};function V(t,a){if(1&t&&(e.TgZ(0,"p",21),e._uU(1),e.qZA()),2&t){const i=a.$implicit;e.Q6J("ngClass",e.VKq(2,$,0!=a.index)),e.xp6(1),e.Oqu(i)}}function W(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"div",12),e.NdJ("click",function(){const s=e.CHM(i).$implicit,p=e.oxw(2);return e.KtG(p.seleccionDeFila(s))}),e.TgZ(1,"div",2),e._uU(2),e.qZA(),e.TgZ(3,"div",13),e._uU(4),e.qZA(),e.TgZ(5,"div",13),e._uU(6),e.qZA(),e.TgZ(7,"div",13),e._uU(8),e.qZA(),e.TgZ(9,"div",13),e._uU(10),e.qZA(),e.TgZ(11,"div",14),e.YNc(12,V,2,4,"p",15),e.ALo(13,"especialidades"),e.qZA(),e.TgZ(14,"div",14),e._uU(15),e.qZA(),e.TgZ(16,"div",16),e._uU(17),e.ALo(18,"fechaString"),e.qZA(),e.TgZ(19,"div",16),e._uU(20),e.ALo(21,"estados"),e.qZA(),e.TgZ(22,"div",16),e._UZ(23,"textarea",17,18),e.qZA(),e.TgZ(25,"div",16)(26,"button",19),e.NdJ("click",function(){const s=e.CHM(i).$implicit,p=e.oxw(2);return e.KtG(p.aceptar(s))}),e._uU(27,"Habilitar"),e.qZA(),e.TgZ(28,"button",20),e.NdJ("click",function(){const s=e.CHM(i).$implicit,p=e.MAs(24),Z=e.oxw(2);return e.KtG(Z.rechazar(s,p))}),e._uU(29,"Rechazar"),e.qZA()()()}if(2&t){const i=a.$implicit,o=e.oxw(2);e.ekj("fila-seleccionada",null!=o.filaSeleccionada&&i.id===o.filaSeleccionada.id),e.xp6(2),e.hij(" ",i.id," "),e.xp6(2),e.hij(" ",i.nombre," "),e.xp6(2),e.hij(" ",i.apellido," "),e.xp6(2),e.hij(" ",i.edad," "),e.xp6(2),e.hij(" ",i.dni," "),e.xp6(2),e.Q6J("ngForOf",e.lcZ(13,11,i)),e.xp6(3),e.hij(" ",i.correo," "),e.xp6(2),e.hij(" ",e.lcZ(18,13,i.fechaRegistro)," "),e.xp6(3),e.hij(" ",e.lcZ(21,15,i.habilitado)," ")}}function X(t,a){if(1&t&&e.YNc(0,W,30,17,"div",11),2&t){const i=e.oxw();e.Q6J("ngForOf",i.listado)}}let ee=(()=>{class t{constructor(i,o,n,s){this.solicitudService=i,this.especialidadService=o,this.formatoService=n,this.toastService=s,this.listado=[],this.spinner=!1}ngOnInit(){this.obtenerUsuarios()}ngOnDestroy(){this.suscripcion&&this.suscripcion.unsubscribe()}obtenerUsuarios(){var i=this;return(0,m.Z)(function*(){i.spinner=!0,i.suscripcion&&i.suscripcion.unsubscribe(),i.suscripcion=i.solicitudService.traerListaDeSolicitudesFiltradaConObservable("habilitado",g.j.espera).subscribe(o=>{i.spinner=!0,i.listado=o,i.spinner=!1})})()}seleccionDeFila(i){this.filaSeleccionada=i}aceptar(i){if(i.habilitado=g.j.habilitado,""!=i.otroEspecialidad){let o={id:(0,B.Z)(),nombre:this.formatoService.eliminarEspaciosYPasarAMin_May(i.otroEspecialidad)};this.especialidadService.cargarEspecialidadConIdAsignado(o),i.especialidades.push(o)}this.solicitudService.modificarSolicitud(i)}rechazar(i,o){o&&""!=o.value.trim()?(i.mensajeEstado=o.value,i.habilitado=g.j.rechazado,this.solicitudService.modificarSolicitud(i)):this.toastService.error("Debe detallar el motivo de rechazo.","Aviso.")}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(w.M),e.Y36(R.T),e.Y36(c.y),e.Y36(y.k))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-lista-usuarios-en-espera"]],decls:38,vars:2,consts:[[1,"container-fluid"],[1,"row","bg-dark","text-light","text-center"],[1,"col-sm","border","d-none"],[1,"custom-font-headers"],[1,"col","col-12","col-xl-1","border"],[1,"col","col-12","col-xl-2","border"],["class","d-flex justify-content-center",4,"ngIf","ngIfElse"],["lista",""],[1,"d-flex","justify-content-center"],[1,"m-3","fs-3","fw-bold"],[1,"spinner-border","text-danger",2,"align-self","center","scale","1.2"],["class","row custom-pointer bg-light",3,"fila-seleccionada","click",4,"ngFor","ngForOf"],[1,"row","custom-pointer","bg-light",3,"click"],[1,"col","col-12","col-xl-1","border","custom-font-data"],[1,"col","col-12","col-xl-2","border","custom-font-data","text-right"],[3,"ngClass",4,"ngFor","ngForOf"],[1,"col","col-12","col-xl-1","border","custom-font-data","text-right"],["type","text",1,"form-control","textarea"],["mensajeRechazo",""],[1,"btn","btn-success","fw-bold","fs-4","w-100",3,"click"],[1,"btn","btn-danger","fw-bold","fs-4","w-100",3,"click"],[3,"ngClass"]],template:function(i,o){if(1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h3",3),e._uU(4,"Id"),e.qZA()(),e.TgZ(5,"div",4)(6,"h3",3),e._uU(7,"Nombre"),e.qZA()(),e.TgZ(8,"div",4)(9,"h3",3),e._uU(10,"Apellido"),e.qZA()(),e.TgZ(11,"div",4)(12,"h3",3),e._uU(13,"Edad"),e.qZA()(),e.TgZ(14,"div",4)(15,"h3",3),e._uU(16,"Dni"),e.qZA()(),e.TgZ(17,"div",5)(18,"h3",3),e._uU(19,"Especialidades"),e.qZA()(),e.TgZ(20,"div",5)(21,"h3",3),e._uU(22,"Correo"),e.qZA()(),e.TgZ(23,"div",4)(24,"h3",3),e._uU(25,"Registro"),e.qZA()(),e.TgZ(26,"div",4)(27,"h3",3),e._uU(28,"Estado"),e.qZA()(),e.TgZ(29,"div",4)(30,"h3",3),e._uU(31,"Motivo rechazo"),e.qZA()(),e.TgZ(32,"div",4)(33,"h3",3),e._uU(34,"Habilitar"),e.qZA()()(),e.YNc(35,K,4,0,"div",6),e.YNc(36,X,1,1,"ng-template",null,7,e.W1O),e.qZA()),2&i){const n=e.MAs(37);e.xp6(35),e.Q6J("ngIf",o.spinner)("ngIfElse",n)}},dependencies:[f.mk,f.sg,f.O5,h,G,S],styles:[".custom-font-headers[_ngcontent-%COMP%]{font-size:1.4em!important;font-weight:700!important}.custom-font-data[_ngcontent-%COMP%]{font-size:1.03em!important;word-wrap:break-word;font-weight:700}.fila-seleccionada[_ngcontent-%COMP%]{background-color:#009331!important;color:#fff!important;font-weight:700!important;.nueva-especialidad {color: black !important;}}.custom-font[_ngcontent-%COMP%]{font-size:3em!important;font-weight:700!important}.custom-pointer[_ngcontent-%COMP%]{cursor:pointer}img[_ngcontent-%COMP%]{height:100px}.textarea[_ngcontent-%COMP%]{resize:none;height:100%}.nueva-especialidad[_ngcontent-%COMP%]{color:red;font-weight:bolder;font-size:1.03em}"]}),t})();var ie=r(5113),te=r(7675),oe=r(6130),ne=r(9724),ae=r(8276),L=r(7771);function se(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"div",9)(1,"button",10),e.NdJ("click",function(){const s=e.CHM(i).$implicit,p=e.oxw();return e.KtG(p.pacienteSeleccionado(s))}),e.TgZ(2,"div")(3,"mat-icon"),e._UZ(4,"img",11),e.qZA(),e.TgZ(5,"small",12),e._uU(6),e.qZA()()()()}if(2&t){const i=a.$implicit;e.xp6(4),e.Q6J("src",i.imagen2,e.LSH),e.xp6(2),e.hij(" ",i.apellido+", "+i.nombre," ")}}function re(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"div",9)(1,"button",10),e.NdJ("click",function(){const s=e.CHM(i).$implicit,p=e.oxw();return e.KtG(p.especialistaSeleccionado(s))}),e.TgZ(2,"div")(3,"mat-icon"),e._UZ(4,"img",11),e.qZA(),e.TgZ(5,"small",12),e._uU(6),e.qZA()()()()}if(2&t){const i=a.$implicit;e.xp6(4),e.Q6J("src",i.imagen,e.LSH),e.xp6(2),e.hij(" ",i.apellido+", "+i.nombre," ")}}function ce(t,a){if(1&t){const i=e.EpF();e.TgZ(0,"nav",13)(1,"div",14)(2,"div",15)(3,"h3",16),e._uU(4),e.qZA()(),e.TgZ(5,"div",17)(6,"button",18),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.descargarExcel())}),e._uU(7,"Descargar Excel de Usuarios"),e.qZA(),e.TgZ(8,"button",19),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.ocultarBotones("/usuarios/usuarios-en-espera"))}),e._uU(9),e.qZA(),e.TgZ(10,"button",20),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.ocultarBotones("/usuarios"))}),e._uU(11,"Usuarios"),e.qZA()()()()}if(2&t){const i=e.oxw();e.xp6(4),e.hij("",i.ocultarBotonUsuarios?"Listado de Usuarios":"Listado de Usuarios en espera de habilitaci\xf3n"," "),e.xp6(2),e.Q6J("hidden",!i.ocultarBotonUsuarios),e.xp6(2),e.Q6J("hidden",i.ocultarBotonUsuariosEnEspera),e.xp6(1),e.hij("Usuarios en espera (",-1==i.getUsuarioEnEspera()?"0":i.getUsuarioEnEspera(),")"),e.xp6(1),e.Q6J("hidden",i.ocultarBotonUsuarios)}}function le(t,a){1&t&&e._UZ(0,"app-loader")}const de=[{path:"",component:(()=>{class t{constructor(i,o,n,s,p,Z,l,ge,fe){this.solicitudService=i,this.horarioService=o,this.localStorage=n,this.usuarioService=s,this.toastService=p,this.excelService=Z,this.swalService=l,this.authService=ge,this.router=fe,this.ocultarBotonUsuarios=!1,this.ocultarBotonUsuariosEnEspera=!1,this.ocultarNav=!1,this.listadoUsuarios=[],this.usuariosEnEspera=-1,this.spinner=!1,this.cargando=!0}ngOnInit(){var i=this;return(0,m.Z)(function*(){i.obtenerUsuarioActual(),i.ocultarBotones(),i.obtenerUsuariosEnEspera(),i.obtenerUsuarios(),i.suscripcionTurnos=i.horarioService.obtenerListadoDeItemsObservable().subscribe(o=>{i.todosLosTurnos=o.filter(n=>n.ocupado),i.todosLosTurnos=i.ordenar(i.todosLosTurnos)})})()}ordenar(i){return i.sort((o,n)=>o.fechaSolicitud<n.fechaSolicitud?-1:o.fechaSolicitud>n.fechaSolicitud?1:0)}obtenerUsuarioActual(){var i=this;return(0,m.Z)(function*(){i.cargando=!0,i.usuario=yield i.usuarioService.obtenerUsuarioActual(),i.cargando=!1})()}ngOnDestroy(){this.suscripcionEnEspera&&this.suscripcionEnEspera.unsubscribe(),this.suscripcion&&this.suscripcion.unsubscribe(),this.suscripcionTurnos&&this.suscripcionTurnos.unsubscribe()}cerrarSesion(){this.usuarioService.cerrarSesionUsuario()}getUsuarioEnEspera(){return this.solicitudService.usuariosEnEspera}ocultarBotones(i=""){let o="";o=""!=i?i:this.router.url,this.ocultarNav=o.includes("/registro"),this.ocultarBotonUsuarios="/usuarios"==o||o.includes("/registro"),this.ocultarBotonUsuariosEnEspera=o.includes("/usuarios/usuarios-en-espera")}obtenerUsuariosEnEspera(){var i=this;return(0,m.Z)(function*(){i.spinner=!0,i.suscripcionEnEspera&&i.suscripcionEnEspera.unsubscribe(),i.suscripcionEnEspera=i.solicitudService.traerListaDeSolicitudesFiltradaConObservable("habilitado",g.j.espera).subscribe(o=>{-1==i.usuariosEnEspera&&(i.usuariosEnEspera=o.length),i.usuariosEnEspera<o.length&&i.toastService.informacion("Un nuevo usuario solicita habilitaci\xf3n","Aviso.",3e3),i.usuariosEnEspera=o.length,i.solicitudService.usuariosEnEspera=o.length})})()}obtenerUsuarios(){var i=this;return(0,m.Z)(function*(){i.spinner=!0,i.suscripcion&&i.suscripcion.unsubscribe(),i.suscripcion=i.usuarioService.obtenerListadoDeUsuariosObservable().subscribe(o=>{i.spinner=!0,i.pacientes=o.filter(n=>n.perfil==_.L.paciente),i.especialistas=o.filter(n=>n.perfil==_.L.especialista),i.listadoUsuarios=o,i.spinner=!1})})()}descargarExcel(){this.cargando=!0;let i=this.listadoUsuarios.filter(l=>l.perfil==_.L.paciente),o=this.listadoUsuarios.filter(l=>l.perfil==_.L.especialista),n=this.listadoUsuarios.filter(l=>l.perfil==_.L.administrador),s=i.map(l=>({Id:l.id,Nombre:l.nombre,Apellido:l.apellido,Correo:l.correo,Dni:l.dni,Edad:l.edad,Perfil:"Paciente"})),p=o.map(l=>({Id:l.id,Nombre:l.nombre,Apellido:l.apellido,Correo:l.correo,Dni:l.dni,Edad:l.edad,Perfil:"Especialista"})),Z=n.map(l=>({Id:l.id,Nombre:l.nombre,Apellido:l.apellido,Correo:l.correo,Dni:l.dni,Edad:l.edad,Perfil:"Administrador"}));this.excelService.obtenerExcelDeVariasHojas([s,p,Z],"Usuarios",["Pacientes","Especialistas","Administradores"],[40,20,20,30,10,5,15]),this.cargando=!1}pacienteSeleccionado(i){this.cargando=!0;let o=this.todosLosTurnos.filter(n=>n?.paciente?.id==i.id);if(o&&o.length>0){let n=o.map(s=>({Paciente:s.nombrePaciente,Especialidad:s.especialidad,Especialista:s.nombreEspecialista,Fecha_Solicitud:new Date(s.fechaSolicitud).toLocaleDateString(),Estado_turno:s.estadoTurno,Duracion_turno:null!=s.fechaFinalizacion?s.duracion+" minutos.":" - ",Fecha_Finalizacion:null!=s.fechaFinalizacion?new Date(s.fechaFinalizacion).toLocaleDateString():" - ",Comentario_paciente:s.comentarioPaciente,Comentario_medico:s.comentarioMedico}));this.excelService.obtenerExcelDeVariasHojas([n],"Turnos_paciente",["Turnos_paciente"],[40,20,40,20,20,20,20,40,40])}else this.swalService.info("No se ecnontraron datos.");this.cargando=!1}especialistaSeleccionado(i){this.cargando=!0;let o=this.todosLosTurnos.filter(n=>n?.medico?.id==i.id);if(o&&o.length>0){let n=o.map(s=>({Especialista:s.nombreEspecialista,Especialidad:s.especialidad,Paciente:s.nombrePaciente,Fecha_Solicitud:new Date(s.fechaSolicitud).toLocaleDateString(),Estado_turno:s.estadoTurno,Duracion_turno:null!=s.fechaFinalizacion?s.duracion+" minutos.":" - ",Fecha_Finalizacion:null!=s.fechaFinalizacion?new Date(s.fechaFinalizacion).toLocaleDateString():" - ",Comentario_paciente:s.comentarioPaciente,Comentario_medico:s.comentarioMedico}));this.excelService.obtenerExcelDeVariasHojas([n],"Turnos_Especialista",["Turnos_Especialista"],[40,20,40,20,20,20,20,40,40])}else this.swalService.info("El especialista seleccionado no posee turnos ocupados.");this.cargando=!1}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(w.M),e.Y36(ie.p),e.Y36(te.g),e.Y36(u.i),e.Y36(y.k),e.Y36(oe.x),e.Y36(ne.J),e.Y36(d.e),e.Y36(U.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-usuarios"]],decls:15,vars:4,consts:[[1,"container-fluid","p-0","m-0","entrada"],[1,"row","w-100","bg-dark","p-0","m-0"],[1,"col","col-12","col-md-6","d-flex","justify-content-center",2,"flex-direction","column"],[1,"text-center","fw-bold","text-light"],[2,"display","flex","flex-direction","row","justify-content","center"],["class","mat-typography",4,"ngFor","ngForOf"],[1,"text-center","fw-boldf","text-light"],["class","navbar navbar-expand-lg navbar-dark bg-dark",4,"ngIf"],[4,"ngIf"],[1,"mat-typography"],["mat-fab","","color","primary",2,"height","120px","width","120px",3,"click"],[2,"border-radius","50%","width","70px","height","70px",3,"src"],[1,"d-block"],[1,"navbar","navbar-expand-lg","navbar-dark","bg-dark"],[1,"row","w-100"],[1,"col","col-12","col-md-6"],["appIluminar","",1,"text-center"],[1,"col","col-12","col-md-6","d-flex","justify-content-end"],[1,"btn","btn-success","fs-4","fw-bold","p-2","m-2",3,"hidden","click"],["routerLink","usuarios-en-espera",1,"btn","btn-warning","p-2","m-2","fs-4","fw-bold",3,"hidden","click"],["routerLink","./",1,"btn","btn-primary","fs-4","fw-bold","p-2","m-2",3,"hidden","click"]],template:function(i,o){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h3",3),e._uU(4,"Seleccione un paciente par descargar sus turnos"),e.qZA(),e.TgZ(5,"div",4),e.YNc(6,se,7,2,"div",5),e.qZA()(),e.TgZ(7,"div",2)(8,"h3",6),e._uU(9,"Seleccione un especialista par descargar sus turnos"),e.qZA(),e.TgZ(10,"div",4),e.YNc(11,re,7,2,"div",5),e.qZA()()(),e.YNc(12,ce,12,5,"nav",7),e._UZ(13,"router-outlet"),e.qZA(),e.YNc(14,le,1,0,"app-loader",8)),2&i&&(e.xp6(6),e.Q6J("ngForOf",o.pacientes),e.xp6(5),e.Q6J("ngForOf",o.especialistas),e.xp6(1),e.Q6J("ngIf",!o.ocultarNav),e.xp6(2),e.Q6J("ngIf",o.cargando))},dependencies:[f.sg,f.O5,U.lC,U.rH,T.R,ae.y,L.cs],styles:[".custom-font-headers[_ngcontent-%COMP%]{font-size:2em!important;font-weight:700!important}.custom-font-data[_ngcontent-%COMP%]{font-size:1.03em!important;word-wrap:break-word;font-weight:700}.fila-seleccionada[_ngcontent-%COMP%]{background-color:#009331!important;color:#fff!important;font-weight:700!important;.nueva-especialidad {color: black !important;}}.custom-font[_ngcontent-%COMP%]{font-size:3em!important;font-weight:700!important}.custom-pointer[_ngcontent-%COMP%]{cursor:pointer}img[_ngcontent-%COMP%]{height:100px}.imagen-usuario[_ngcontent-%COMP%]{border-radius:100px;width:100px}.textarea[_ngcontent-%COMP%]{resize:none;height:100%}.nueva-especialidad[_ngcontent-%COMP%]{color:red;font-weight:bolder;font-size:1.03em}.columna[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center!important}@keyframes _ngcontent-%COMP%_scale-in-top{0%{transform:scale(0);transform-origin:50% 0;opacity:1}to{transform:scale(1);transform-origin:50% 0;opacity:1}}.entrada[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_scale-in-top .5s cubic-bezier(.25,.46,.45,.94) both}"]}),t})(),children:[{path:"",component:Q},{path:"usuarios-en-espera",component:ee},{path:"registro",loadChildren:()=>Promise.all([r.e(708),r.e(832),r.e(937)]).then(r.bind(r,7937)).then(t=>t.RegistroModule)}]}];let ue=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[U.Bz.forChild(de),U.Bz]}),t})();var pe=r(4466);let me=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[f.ez,ue,pe.m,L.ot]}),t})()},1588:(M,x,r)=>{r.d(x,{Z:()=>g});const U={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let m;const _=new Uint8Array(16);function e(){if(!m&&(m=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!m))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return m(_)}const u=[];for(let c=0;c<256;++c)u.push((c+256).toString(16).slice(1));const g=function E(c,d,h){if(U.randomUUID&&!d&&!c)return U.randomUUID();const v=(c=c||{}).random||(c.rng||e)();if(v[6]=15&v[6]|64,v[8]=63&v[8]|128,d){h=h||0;for(let b=0;b<16;++b)d[h+b]=v[b];return d}return function C(c,d=0){return(u[c[d+0]]+u[c[d+1]]+u[c[d+2]]+u[c[d+3]]+"-"+u[c[d+4]]+u[c[d+5]]+"-"+u[c[d+6]]+u[c[d+7]]+"-"+u[c[d+8]]+u[c[d+9]]+"-"+u[c[d+10]]+u[c[d+11]]+u[c[d+12]]+u[c[d+13]]+u[c[d+14]]+u[c[d+15]]).toLowerCase()}(v)}}}]);