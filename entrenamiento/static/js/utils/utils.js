var utils = {


    /**
     * Se encarga de renderar toda la informacion en el elemento.
     *
     * Para esto, se supone que el elemento ya fue rendereado, y solo se tiene
     * mostrar la informacion dentro del mismo.
     *
     * @param {jQuery} $element: el elemento del DOM en donde se tiene que mostrar
     *                           toda la informacion.
     *
     * @param {Object} data: la informacion que se tiene que mostrar.
     *
     * @param {String} prefix: en caso de que los elementos del DOM empiezen con un
     *                         prefijo, entonces este es el mismo.
     */
    renderFormData: function($element, data, prefix) {
        for (attributeName in data) {
            var value = data[attributeName];
            if ($.isPlainObject(value)) {
                // en este caso me esta mandando la informacion
                // del objecto relacionado, que no me interesa.
                continue;
            }
            var inputId = attributeName;
            if (prefix !== null && prefix !== '') {
                inputId = prefix + '-' + attributeName;
            }
            var inputField = $element.find('#' + inputId);


            if (! inputField.exists()) {
                console.log('No se pudo encontrar el campo correspondiente ' +
                            'para el attributo: ' + inputId);
                continue;
            }
            if (inputField.is('input')) {
                if (inputField.attr('type') === 'hidden') {
                    inputField.val(value);
                    if (_.str.endsWith(attributeName, '_path')) {
                        // en este caso se que estoy con lo de pekeupload,
                        // por lo que busco donde va el nombre correspondiente, y lo mustro ahi
                        $element.find('#' + attributeName + '_existing').html(value);
                    }
                } else if (inputField.attr('type') === 'text') {
                    inputField.val(value);
                } else if (inputField.attr('type') === 'checkbox') {
                    if (value === 1 || value) {
                        inputField.prop('checked', true);
                    } else {
                        inputField.prop('checked', false);
                    }
                }
            } else if (inputField.is('textarea')) {
                inputField.val(value);
                inputField.blur();
            } else if (inputField.is('select')) {
                inputField.val(value);
                inputField.trigger("chosen:updated");
            } else {
                throw new Error('No se en que tipo de campo estoy');
            }
        }
    },

    /**
     * Se encarga de pasar toda la informacion de los filtros a una forma de texto
     * para que se los pueda usar en los llamados Ajax.
     *
     * @param {Array(Filter)} filters: toda la inforamcion de los filtros que se
     *                                 tiene que pasar.
     *
     * @return {String} la informacion de los mismos para que se pueda hacer
     *                  los llamados Ajax.
     */
    translateFiltersToAPI: function(filters) {
        var filtersData = [];
        for (var i = 0; i < filters.length; i++) {
            var currentFilter = filters[i];
            filtersData.push(currentFilter.tableName + '|' + currentFilter.columnName + '|' + currentFilter.operator + '|' + currentFilter.value);
        }
        return filtersData;
    }
};


