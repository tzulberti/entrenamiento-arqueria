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
                        if (value == null || _.isEmpty(value)) {
                            // como no se subio una imagen, entonces no quiero que se
                            // muestre el thumb de la misma porque es un link roto
                            continue;
                        }
                        // en este caso se que estoy con lo de pekeupload,
                        // por lo que busco donde va el nombre correspondiente, y lo mustro ahi
                        var thumb_name = value;
                        thumb_name = thumb_name.replace('/', '/thumb_');
                        $element.find('#' + attributeName + '_existing').html('<a href="/uploads/' + value + '"><img src="/uploads/' + thumb_name + '"></a>');
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
     * Se encarga de aplicar los plugins a los fields del form para tener en cuenta
     * los diferentes casos en los que el usuario puede seleccionar los valores.
     *
     * Entre los plugins que se estan usando son:
     *
     * - chosen
     * - datepicker
     * - timepicker
     *
     *
     * @param {Array(ColumnInformation)} columnsInformation: tiene toda la informacion sobre el
     *                                                       schema de la base de datos.
     *
     * @param {jQuery} formElement: el elemento del DOM que tiene todos los fields
     *                              correspondientes.
     */
    applyJavascriptPluginsToForm: function(columnsInformation, formElement) {
        for (var i = 0; i < columnsInformation.length; i++) {
            var columnInformation = columnsInformation[i];
            var formField = formElement.find('#' + columnInformation.databaseName)

            if (! formField.exists()) {
                // en este caso estoy en una columna que esta en la base de datos
                // pero que no la estoy renderando
                continue;
            }

            if (columnInformation.type === 'date') {
                formField.datepicker({
                    format: 'dd/mm/yyyy'
                });
            } else if (columnInformation.type === 'time') {
                formField.timepicker({
                    showSeconds: false,
                    minuteStep: 1,
                    showMeridian: false
                });
            } else if (columnInformation.isConst()) {
                formField.chosen({
                    width: '300px',
                    placeholder_text_single: columnInformation.frontendName
                });
            } else if (columnInformation.foreignKey !== null) {
                formField.chosen({
                    width: '300px',
                    placeholder_text_single: columnInformation.frontendName,
                    inherit_select_classes: true
                });
            }
        }

        // esto lo tengo que hacer aca porque sino no puedo distinguir entre
        // los textos comunes y los textare
        formElement.find('textarea').cleditor({
                controls: "bold italic underline | " +
                          "font size | "  +
                          "color highlight | " +
                          "alignleft center alignright justify | " +
                          "bullets numbering"
        });
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
    },

    getMonthsDifference: function(minDate, maxDate) {
        if (minDate.year() === maxDate.year() && minDate.month() === maxDate.month()) {
            return 0
        }
        var difference = 0;
        var aux = moment(minDate);
        while (true) {
            difference += 1;
            aux.add('months', 1);
            if (aux.year() === maxDate.year() && aux.month() === maxDate.month()) {
                break;
            }
        }
        return difference;
    }
};


