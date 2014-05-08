/**
 * Algunas extensiones que le agrego a jQuery para poder simplificar
 * mas el codigo.
 */
$.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

/**
 * Limpia todo el html, y saca todos los events de los hijos
 * del elemento y tambien los del elemento en cuestion.
 */
$.fn.clean = function() {
    this.children().off();
    this.find('*').off();
    this.off();
    this.empty();
};

/**
 * Chequea si elemento del DOM existe.
 */
jQuery.fn.exists = function(){
    return this.length>0;
}
