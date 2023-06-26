"use strict";(self.webpackChunkTP_CLINICA=self.webpackChunkTP_CLINICA||[]).push([[708],{5708:(F,f,m)=>{m.d(f,{$k:()=>h,FQ:()=>C,Lg:()=>N,Ms:()=>p,QB:()=>S,U5:()=>V,_s:()=>E,ef:()=>b,fl:()=>A,j8:()=>x,qc:()=>y,qe:()=>M,sH:()=>I,wb:()=>$,y$:()=>g});var v=m(4004);function p(i,a,e=null){return t=>{const r=t,o={};return""==r?.value||null==r?.value||null==r?.value?o.campoVacio={hayError:!0,mensaje:null!=e&&null!=e.campoVacio?e.campoVacio:"Campo requerido."}:isNaN(r?.value)||r?.value?.includes(".")||r?.value?.includes(",")?o.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:"Solo se pueden ingresar caracteres num\xe9ricos."}:(r?.value<i||r?.value>a)&&(o.valorInvalido={hayError:!0,mensaje:null!=e&&null!=e.valorInvalido?e.valorInvalido:`Solo se admiten valores entre ${i} y ${a}.`}),Object.keys(o).length?(r?.setErrors(o),o):(r?.setErrors(null),null)}}function E(i,a,e=null,t=!1){return r=>{const o=r,l={};return""==o?.value||null==o?.value||null==o?.value?l.campoVacio={hayError:!0,mensaje:null!=e&&null!=e.campoVacio?e.campoVacio:"Campo requerido."}:(o?.value<i||o?.value>a)&&(l.valorInvalido={hayError:!0,mensaje:null!=e&&null!=e.valorInvalido?e.valorInvalido:`Solo se admiten valores entre ${i} y ${a}.`}),t&&null!=o?.value&&(o?.value.toString().includes(".")||o?.value.toString().includes(","))&&(l.soloEnteros={hayError:!0,mensaje:null!=e&&null!=e.valorInvalido?e.valorInvalido:"Solo se admiten n\xfameros enteros."}),Object.keys(l).length?(o?.setErrors(l),l):(o?.setErrors(null),null)}}function h(i,a,e=null,t=!1,r=!0){return o=>{const l=o,u={};let n=null==l?.value||null==l?.value||""==l?.value.trim();return n?u.campoVacio={hayError:!0,mensaje:null!=e&&null!=e.campoVacio?e.campoVacio:"Campo requerido."}:l?.value.length<i?u.lenMinimo={hayError:!0,mensaje:null!=e&&null!=e.lenMinimo?e.lenMinimo:`Solo se admite un m\xednimo de ${i} caracteres.`}:l?.value.length>a&&(u.lenMaximo={hayError:!0,mensaje:null!=e&&null!=e.lenMaximo?e.lenMaximo:`Solo se admite un m\xe1ximo de ${a} caracteres.`}),t?!n&&!(r?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(l.value)&&(u.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:`Solo se admiten letras a-z ${r?"":"(sin espacios)"}.`}):r||!n&&/\s/.test(l.value)&&(u.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:"No se admiten espacios."}),Object.keys(u).length?(l?.setErrors(u),u):(l?.setErrors(null),null)}}function y(){return i=>{const a=i,t={};return null==a?.value||null==a?.value||""==a?.value.trim()?t.campoVacio={hayError:!0,mensaje:"Campo requerido."}:/^([a-zA-Z0-9_\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/.test(i.value)||(t.formatoInvalido={hayError:!0,mensaje:"El formato de correo electr\xf3nico es invalido. "}),Object.keys(t).length?(a?.setErrors(t),t):(a?.setErrors(null),null)}}function V(i){return a=>{const e=a.get("clave"),t=a.get("confirmarClave"),r={};return e?.value!==t?.value&&(r.clavesDistintas={hayError:!0,mensaje:"Las clave y confirmaci\xf3n NO conciden."}),null==t?.value||null==t?.value||""==t?.value.trim()?r.campoVacio={hayError:!0,mensaje:"Campo requerido."}:t?.value.length<i&&(r.longitudInvalida={hayError:!0,mensaje:`La confirmaci\xf3n de clave debe contener por lo menos ${i} caracteres. \n`}),Object.keys(r).length?(t?.setErrors(r),r):(t?.setErrors(null),null)}}function g(i,a,e){return t=>{a.validando=!0;const r=e.eliminarEspaciosYPasarAMin_May(t.value),o={};return i.traerListaDeCorreosFiltradaConObservable(r).pipe((0,v.U)(l=>l.length>0&&(o.datoExistente={hayError:!0,mensaje:"El correo electr\xf3nico ingresado ya existe."},Object.keys(o).length)?(t?.setErrors(o),a.validando=!1,o):(t?.setErrors(null),a.validando=!1,null)))}}function x(i,a){return e=>{a.validando=!0;const r={};return i.traerListaDeDniFiltradaConObservable(e.value).pipe((0,v.U)(o=>o.length>0&&(r.datoExistente={hayError:!0,mensaje:"El dni ingresado ya se encuentra cargado en el sistema."},Object.keys(r).length)?(e?.setErrors(r),a.validando=!1,r):(e?.setErrors(null),a.validando=!1,null)))}}function I(i,a,e){return t=>{a.validando=!0;const r=e.eliminarEspaciosYPasarAMin_May(t.value),o={};return i.traerListaDeEspecialidadesFiltradaConObservable(r).pipe((0,v.U)(l=>l.length>0&&(o.datoExistente={hayError:!0,mensaje:"La especialidad ingresada ya existe."},Object.keys(o).length)?(t?.setErrors(o),a.validando=!1,o):t?.errors?(a.validando=!1,t?.errors):(t?.setErrors(null),a.validando=!1,null)))}}function C(){return i=>{const a=i,e={};if(""==a?.value||null==a?.value||null==a?.value)e.campoVacio={hayError:!0,mensaje:"Campo requerido."};else{var t=a?.value,r=t.lastIndexOf(".")+1,o=t.substr(r,t.length).toLowerCase();"jpg"!=o&&"jpeg"!=o&&"png"!=o&&(e.archivoInvalido={hayError:!0,mensaje:"Solo se admiten archivos de tipo jpg | jpeg | png."})}return Object.keys(e).length?(a?.setErrors(e),e):(a?.setErrors(null),null)}}function M(){return i=>{const a=i,e=[];return(""==a?.value||null==a?.value||null==a?.value||-1==a?.value)&&(e.campoVacio={hayError:!0,mensaje:"Campo requerido."}),Object.keys(e).length?(a?.setErrors(e),e):(a?.setErrors(null),null)}}function $(i,a,e,t,r=null,o=!1,l=!0){return u=>{const n=u.get(e),c=u.get(t);if(n&&n.value){const s={};let d=null==c?.value||null==c?.value||""==c?.value.trim();if(d?s.campoVacio={hayError:!0,mensaje:null!=r&&null!=r.campoVacio?r.campoVacio:"Campo requerido."}:c?.value.length<i?s.lenMinimo={hayError:!0,mensaje:null!=r&&null!=r.lenMinimo?r.lenMinimo:`Solo se admite un m\xednimo de ${i} caracteres.`}:c?.value.length>a&&(s.lenMaximo={hayError:!0,mensaje:null!=r&&null!=r.lenMaximo?r.lenMaximo:`Solo se admite un m\xe1ximo de ${a} caracteres.`}),o?!d&&!(l?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(c?.value)&&(s.textoInvalido={hayError:!0,mensaje:null!=r&&null!=r.textoInvalido?r.textoInvalido:`Solo se admiten letras a-z ${l?"":"(sin espacios)"}.`}):l||!d&&/\s/.test(c?.value)&&(s.textoInvalido={hayError:!0,mensaje:null!=r&&null!=r.textoInvalido?r.textoInvalido:"No se admiten espacios."}),Object.keys(s).length)return c?.setErrors(s),s}return c?.setErrors(null),null}}function b(i,a,e=null,t=!1,r=!0){return o=>{const l=o.get("opcionalNombre1"),u=o.get("opcionalValor1"),n={},c={};if(""!=l?.value.trim()&&""==u?.value.trim()?(c.campoVacio={hayError:!0,mensaje:"Campo requerido."},u?.setErrors(c)):u?.setErrors(null),""==l?.value.trim()&&""!=u?.value.trim()?(n.campoVacio={hayError:!0,mensaje:"Campo requerido."},l?.setErrors(n)):l?.setErrors(null),""!=l?.value){let s=null==l?.value||null==l?.value||""==l?.value.trim();s?n.campoVacio={hayError:!0,mensaje:null!=e&&null!=e.campoVacio?e.campoVacio:"Campo requerido."}:l?.value.length<i?n.lenMinimo={hayError:!0,mensaje:null!=e&&null!=e.lenMinimo?e.lenMinimo:`Solo se admite un m\xednimo de ${i} caracteres.`}:l?.value.length>a&&(n.lenMaximo={hayError:!0,mensaje:null!=e&&null!=e.lenMaximo?e.lenMaximo:`Solo se admite un m\xe1ximo de ${a} caracteres.`}),t?!s&&!(r?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(l?.value)&&(n.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:`Solo se admiten letras a-z ${r?"":"(sin espacios)"}.`}):r||!s&&/\s/.test(l?.value)&&(n.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:"No se admiten espacios."})}return Object.keys(n).length?(l?.setErrors(n),n):(l?.setErrors(null),null)}}function A(i,a,e=null,t=!1,r=!0){return o=>{const l=o.get("opcionalNombre2"),u=o.get("opcionalValor2"),n={},c={};if(""!=l?.value.trim()&&""==u?.value.trim()?(c.campoVacio={hayError:!0,mensaje:"Campo requerido."},u?.setErrors(c)):u?.setErrors(null),""==l?.value.trim()&&""!=u?.value.trim()?(n.campoVacio={hayError:!0,mensaje:"Campo requerido."},l?.setErrors(n)):l?.setErrors(null),""!=l?.value){let s=null==l?.value||null==l?.value||""==l?.value.trim();s?n.campoVacio={hayError:!0,mensaje:null!=e&&null!=e.campoVacio?e.campoVacio:"Campo requerido."}:l?.value.length<i?n.lenMinimo={hayError:!0,mensaje:null!=e&&null!=e.lenMinimo?e.lenMinimo:`Solo se admite un m\xednimo de ${i} caracteres.`}:l?.value.length>a&&(n.lenMaximo={hayError:!0,mensaje:null!=e&&null!=e.lenMaximo?e.lenMaximo:`Solo se admite un m\xe1ximo de ${a} caracteres.`}),t?!s&&!(r?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(l?.value)&&(n.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:`Solo se admiten letras a-z ${r?"":"(sin espacios)"}.`}):r||!s&&/\s/.test(l?.value)&&(n.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:"No se admiten espacios."})}return Object.keys(n).length?(l?.setErrors(n),n):(l?.setErrors(null),null)}}function N(i,a,e=null,t=!1,r=!0){return o=>{const l=o.get("opcionalNombre3"),u=o.get("opcionalValor3"),n={},c={};if(""!=l?.value.trim()&&""==u?.value.trim()?(c.campoVacio={hayError:!0,mensaje:"Campo requerido."},u?.setErrors(c)):u?.setErrors(null),""==l?.value.trim()&&""!=u?.value.trim()?(n.campoVacio={hayError:!0,mensaje:"Campo requerido."},l?.setErrors(n)):l?.setErrors(null),""!=l?.value){let s=null==l?.value||null==l?.value||""==l?.value.trim();s?n.campoVacio={hayError:!0,mensaje:null!=e&&null!=e.campoVacio?e.campoVacio:"Campo requerido."}:l?.value.length<i?n.lenMinimo={hayError:!0,mensaje:null!=e&&null!=e.lenMinimo?e.lenMinimo:`Solo se admite un m\xednimo de ${i} caracteres.`}:l?.value.length>a&&(n.lenMaximo={hayError:!0,mensaje:null!=e&&null!=e.lenMaximo?e.lenMaximo:`Solo se admite un m\xe1ximo de ${a} caracteres.`}),t?!s&&!(r?/^[a-zA-Z\s]+$/:/^[a-zA-Z]+$/).test(l?.value)&&(n.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:`Solo se admiten letras a-z ${r?"":"(sin espacios)"}.`}):r||!s&&/\s/.test(l?.value)&&(n.textoInvalido={hayError:!0,mensaje:null!=e&&null!=e.textoInvalido?e.textoInvalido:"No se admiten espacios."})}return Object.keys(n).length?(l?.setErrors(n),n):(l?.setErrors(null),null)}}function S(){return i=>{const a=i,e={};if(null==a?.value||null==a?.value||""==a?.value.trim())e.campoVacio={hayError:!0,mensaje:"Campo requerido."};else try{if(a.value.includes(" ")||a.value.length>10)e.errorFormato={hayError:!0,mensaje:"Formato de fecha inv\xe1lido."};else if(a.value.includes("/")){let r=a.value.split("/");if(3==r.length)if(""==r[0]||""==r[1]||""==r[2]||isNaN(r[0])||isNaN(r[1])||isNaN(r[2]))e.errorFormato={hayError:!0,mensaje:"Formato de fecha inv\xe1lido."};else{let o=parseInt(r[0]),l=parseInt(r[1]),u=parseInt(r[2]),n=new Date(u,l,o);o>31||o<1||l<1||l>12?e.errorFormato={hayError:!0,mensaje:"Formato de fecha inv\xe1lido."}:n?(n.getFullYear()<2010||n.getFullYear()>2050)&&(e.errorParametros={hayError:!0,mensaje:"Solo fechas entre los a\xf1os 2010 y 2050."}):e.errorFormato={hayError:!0,mensaje:"Formato de fecha inv\xe1lido."}}else e.errorFormato={hayError:!0,mensaje:"Formato de fecha inv\xe1lido."}}else e.errorFormato={hayError:!0,mensaje:"Formato de fecha inv\xe1lido."}}catch{e.fechaInvalida={hayError:!0,mensaje:"Fecha inv\xe1lida."}}return Object.keys(e).length?(a?.setErrors(e),e):(a?.setErrors(null),null)}}}}]);