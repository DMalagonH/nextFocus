/**
 * Plugin para enfocar el siguiente campo de texto con el mismo selector del actual al dar enter
 * 
 * Dependencias: jQuery 
 *  
 * @author Diego Malagón 
 * @param {Funtion} $ jQuery
 * @returns {undefined}
 */
(function($){
    
    var NextFocus = function(){
        var el;
        var options;
        var selector;
        
        /**
         * Función para asignar los event listeners al campo de texto
         * 
         * @returns {undefined}
         */
        var init = function(){
            // Por cada input
            $(el).each(function(){
                $(this).keydown(function(e){
                    var keyCode = e.keyCode || e.which;
                    
                    // Si la tecla presionada está en la lista de keys
                    if(options.keys.indexOf(keyCode) !== -1){
                        e.preventDefault();
                        var inputs = $(selector);
                        
                        // Obtener indice de input actual
                        var i = inputs.index(this);
                        
                        // Si no se esta presionando la tecla shift
                        if(!e.shiftKey){
                            // Aumentar en 1 el indice
                            i++;
                        }
                        else{
                            // Disminuir en 1 el indice
                            i--;
                        }
                        
                        if(i >= inputs.length){
                            i = 0;
                            if(typeof options.end === "function"){
                                options.end(i);
                            }
                        }
                        
                        // Colocar foco en el input con indice i
                        inputs.eq(i).focus();                          
                    }
                });
            });
        };
        
        return {
            init: function(element, opts){
                el = element;
                selector = el.selector;
                options = opts;
                
                init();
            }
        };
    };
    
    $.fn.nextfocus = function(options, args){      
        var element = this;
        var Plugin = new NextFocus();
        
        if(Plugin[options]){
            return NextFocus[options](args);
        }
        else if(typeof(options) === "object" || !options){
            
            options = $.extend({}, $.fn.nextfocus.defaults, options);
            
            return Plugin.init(element, options, args);
        }
    };
    
    $.fn.nextfocus.defaults = {
        keys:   [9, 13],
        end:    null
    };
    
})(jQuery);


