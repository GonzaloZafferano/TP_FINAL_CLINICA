"use strict";(self.webpackChunkTP_CLINICA=self.webpackChunkTP_CLINICA||[]).push([[423],{6423:(Y,p,r)=>{r.r(p),r.d(p,{PacientesModule:()=>F});var d=r(6895),_=r(6378),s=r(5861),m=r(3474),f=r(6912),t=r(4650),h=r(1209),x=r(5113),C=r(6581),v=r(605),Z=r(107);function P(e,o){1&e&&(t.TgZ(0,"div",11)(1,"span",12),t._uU(2,"Cargando..."),t.qZA(),t._UZ(3,"div",13),t.qZA())}function T(e,o){if(1&e){const n=t.EpF();t.ynx(0),t.TgZ(1,"button",25),t.NdJ("click",function(){t.CHM(n);const a=t.oxw(2).$implicit,l=t.oxw(3);return t.KtG(l.mostrarHistoria(a))}),t._uU(2,"Ver Historia Cl\xednica"),t.qZA(),t.BQk()}}function b(e,o){1&e&&(t.TgZ(0,"h3",4),t._uU(1,"Sin historia Cl\xednica"),t.qZA())}function A(e,o){if(1&e&&(t.ynx(0),t.YNc(1,T,3,0,"ng-container",14),t.YNc(2,b,2,0,"ng-template",null,24,t.W1O),t.BQk()),2&e){const n=t.MAs(3),i=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",i.tieneHC)("ngIfElse",n)}}function I(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"div",17),t.NdJ("click",function(){const l=t.CHM(n).$implicit,g=t.oxw(3);return t.KtG(g.seleccionDeFila(l))}),t.TgZ(1,"div",3),t._uU(2),t.qZA(),t.TgZ(3,"div",18)(4,"p"),t._uU(5),t.qZA()(),t.TgZ(6,"div",18)(7,"p"),t._uU(8),t.qZA()(),t.TgZ(9,"div",19)(10,"p"),t._uU(11),t.qZA()(),t.TgZ(12,"div",19)(13,"p"),t._uU(14),t.qZA()(),t.TgZ(15,"div",20)(16,"p"),t._uU(17),t.qZA()(),t.TgZ(18,"div",21)(19,"div",11),t._UZ(20,"img",22),t.qZA()(),t.TgZ(21,"div",23),t.YNc(22,A,4,2,"ng-container",9),t.qZA()()}if(2&e){const n=o.$implicit,i=t.oxw(3);t.ekj("fila-seleccionada",null!=i.filaSeleccionada&&n.id===i.filaSeleccionada.id),t.xp6(2),t.hij(" ",n.id," "),t.xp6(3),t.hij(" ",n.nombre," "),t.xp6(3),t.hij(" ",n.apellido," "),t.xp6(3),t.hij(" ",n.edad," "),t.xp6(3),t.hij(" ",n.dni," "),t.xp6(3),t.hij(" ",n.correo," "),t.xp6(3),t.Q6J("src",i.obtenerUrlImagen(n),t.LSH),t.xp6(2),t.Q6J("ngIf",1==n.perfil)}}function U(e,o){if(1&e&&(t.ynx(0),t.YNc(1,I,23,10,"div",16),t.BQk()),2&e){const n=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",n.listado)}}function M(e,o){1&e&&(t.ynx(0),t.TgZ(1,"h3",26),t._uU(2,"Sin Pacientes Atendidos"),t.qZA(),t.BQk())}function O(e,o){if(1&e&&t.YNc(0,M,3,0,"ng-container",9),2&e){const n=t.oxw(2);t.Q6J("ngIf",n.hizoBusqueda&&n.listado&&0==n.listado.length)}}function y(e,o){if(1&e&&(t.YNc(0,U,2,1,"ng-container",14),t.YNc(1,O,1,1,"ng-template",null,15,t.W1O)),2&e){const n=t.MAs(2),i=t.oxw();t.Q6J("ngIf",i.listado&&i.listado.length>0)("ngIfElse",n)}}function N(e,o){1&e&&t._UZ(0,"app-loader")}function w(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"app-historia",27),t.NdJ("OnCerrar",function(){t.CHM(n);const a=t.oxw();return t.KtG(a.cerrarHC())}),t.qZA()}if(2&e){const n=t.oxw();t.Q6J("historia",n.historiaClinica)}}const H=[{path:"",component:(()=>{class e{constructor(n,i,a){this.usuarioService=n,this.horarioService=i,this.historiaService=a,this.listado=[],this.spinner=!1,this.cargando=!1,this.hizoBusqueda=!1,this.mostrarHC=!1}ngOnInit(){var n=this;return(0,s.Z)(function*(){n.usuarioActual=yield n.usuarioService.obtenerUsuarioActual(),n.obtenerUsuarios()})()}ngOnDestroy(){this.suscripcion&&this.suscripcion.unsubscribe(),this.suscripcionEnEspera&&this.suscripcionEnEspera.unsubscribe()}obtenerUsuarios(){var n=this;return(0,s.Z)(function*(){n.suscripcion&&n.suscripcion.unsubscribe(),n.suscripcion=n.horarioService.obtenerListadoDeItemsObservable().subscribe(function(){var i=(0,s.Z)(function*(a){n.spinner=!0,n.hizoBusqueda=!0;let u=a.filter(c=>c.idMedico==n.usuarioActual.id&&"Realizado"==c.estadoTurno).filter((c,J,q)=>J===q.findIndex(Q=>Q.idPaciente===c.idPaciente)).map(c=>c.idPaciente);if(u&&u.length>0){let c=yield n.usuarioService.traerListaFiltradaPor_UN_CampoConCondicion_Observable("id",f.n.in,u);n.listado=c}n.spinner=!1});return function(a){return i.apply(this,arguments)}}())})()}seleccionDeFila(n){this.filaSeleccionada=n}obtenerUrlImagen(n){return n.perfil!=m.L.paciente?n.imagen:n.imagen1}cerrarHC(){this.cargando=!1,this.mostrarHC=!1}mostrarHistoria(n){var i=this;return(0,s.Z)(function*(){i.cargando=!0;let a=yield i.historiaService.traerListaFiltradaPor_UN_Campo("pacienteId",n.id);a&&a.length>0?(i.historiaClinica=a[0],i.mostrarHC=!0):i.cerrarHC()})()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(h.i),t.Y36(x.p),t.Y36(C.T))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-pacientes"]],decls:33,vars:4,consts:[[1,"container-fluid","entrada"],[1,"text-center","custom-font"],[1,"row","bg-dark","text-light","text-center"],[1,"col","col","border","d-none"],[1,"custom-font-headers"],[1,"col","col-12","col-xl-2","border"],[1,"col","col-12","col-xl-1","border"],["class","d-flex justify-content-center",4,"ngIf","ngIfElse"],["lista",""],[4,"ngIf"],[3,"historia","OnCerrar",4,"ngIf"],[1,"d-flex","justify-content-center"],[1,"m-3","fs-3","fw-bold"],[1,"spinner-border","text-danger",2,"align-self","center","scale","1.2"],[4,"ngIf","ngIfElse"],["sinPac",""],["class","row custom-pointer bg-light",3,"fila-seleccionada","click",4,"ngFor","ngForOf"],[1,"row","custom-pointer","bg-light",3,"click"],[1,"col","col-12","col-xl-2","border","custom-font-data","columna"],[1,"col","col-12","col-xl-1","border","custom-font-data","columna"],[1,"col","col-12","col-xl-2","border","custom-font-data","text-right","columna"],[1,"col","col-12","col-xl-2","border","custom-font-data","text-right","justify-content-center","columna"],["alt","imagen usuario",1,"imagen-usuario",3,"src"],[1,"col","col-12","col-xl-2","border","d-flex",2,"align-items","center"],["pacienteSinHC",""],[1,"btn","btn-primary","fs-4","fw-bold","p-2","m-2",3,"click"],[1,"text-center","fs-1","fw-bold"],[3,"historia","OnCerrar"]],template:function(n,i){if(1&n&&(t.TgZ(0,"div",0)(1,"h3",1),t._uU(2,"Listado de Pacientes"),t.qZA(),t.TgZ(3,"div",2)(4,"div",3)(5,"h3",4),t._uU(6,"Id"),t.qZA()(),t.TgZ(7,"div",5)(8,"h3",4),t._uU(9,"Nombre"),t.qZA()(),t.TgZ(10,"div",5)(11,"h3",4),t._uU(12,"Apellido"),t.qZA()(),t.TgZ(13,"div",6)(14,"h3",4),t._uU(15,"Edad"),t.qZA()(),t.TgZ(16,"div",6)(17,"h3",4),t._uU(18,"Dni"),t.qZA()(),t.TgZ(19,"div",5)(20,"h3",4),t._uU(21,"Correo"),t.qZA()(),t.TgZ(22,"div",5)(23,"h3",4),t._uU(24,"Imagen"),t.qZA()(),t.TgZ(25,"div",5)(26,"h3",4),t._uU(27,"Historia Cl\xednica"),t.qZA()()(),t.YNc(28,P,4,0,"div",7),t.YNc(29,y,3,2,"ng-template",null,8,t.W1O),t.qZA(),t.YNc(31,N,1,0,"app-loader",9),t.YNc(32,w,1,1,"app-historia",10)),2&n){const a=t.MAs(30);t.xp6(28),t.Q6J("ngIf",i.spinner)("ngIfElse",a),t.xp6(3),t.Q6J("ngIf",i.cargando),t.xp6(1),t.Q6J("ngIf",i.mostrarHC)}},dependencies:[d.sg,d.O5,v.R,Z.N],styles:[".custom-font-headers[_ngcontent-%COMP%]{font-size:1.4em!important;font-weight:700!important}.custom-font-data[_ngcontent-%COMP%]{font-size:1.03em!important;word-wrap:break-word;font-weight:700}.fila-seleccionada[_ngcontent-%COMP%]{background-color:#009331!important;color:#fff!important;font-weight:700!important;.nueva-especialidad {color: black !important;}}.custom-font[_ngcontent-%COMP%]{font-size:3em!important;font-weight:700!important}.custom-pointer[_ngcontent-%COMP%]{cursor:pointer}img[_ngcontent-%COMP%]{height:100px}.imagen-usuario[_ngcontent-%COMP%]{border-radius:100px;width:100px}.textarea[_ngcontent-%COMP%]{resize:none;height:100%}.nueva-especialidad[_ngcontent-%COMP%]{color:red;font-weight:bolder;font-size:1.03em}.columna[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center!important}@keyframes _ngcontent-%COMP%_scale-in-tl{0%{transform:scale(0);transform-origin:0 0;opacity:1}to{transform:scale(1);transform-origin:0 0;opacity:1}}.entrada[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_scale-in-tl .5s cubic-bezier(.25,.46,.45,.94) both}"]}),e})()}];let E=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[_.Bz.forChild(H),_.Bz]}),e})();var S=r(4466);let F=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[d.ez,E,S.m]}),e})()}}]);