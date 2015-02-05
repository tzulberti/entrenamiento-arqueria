/**
 * Se encarga de rendear toda la infromacion de la tabla
 */
var TableView = Class.$extend({

    __init__: function(element, columnsInformation, fkInformation) {
        this.$element = element;
        this.columnsInformation = columnsInformation;
        this.fkInformation = fkInformation;

        this.template = $("#table-content-view-handlebars-template").html();
    },

    /**
     * Se encarga de mostrar el icono de lo que pasa cuando se esta
     * buscando la informacion
     */
    renderGettingInformation: function() {
        this.$element.mask('Loading');
    },

    /**
     * Se encarga de renderar toda la informacion de la base de datos.
     *
     * @param {Array(String)} columnNames: los nombres de las columnas que
     *                                     se tienen que mostrar.
     *
     * @param {String} orderBy: el nombre de la columna por la cual se ordena
     *                          toda la informacion de la base de datos.
     *
     * @param {String} orderDirection: indica en que sentido se ordeno toda
     *                                 la informacion.
     *
     * @param {Array(Object)} values: los valores de la base de datos que se
     *                                tienen que mostrar.
     */
    renderInformation: function(columnNames, orderBy, orderDirection, values) {
        this.$element.unmask();
        var html = Handlebars.render(this.template, {
                columnNames: columnNames,
                values: values,
                orderDirection: orderDirection,
                orderBy: orderBy,
                columnsInformation: this.columnsInformation,
                fkInformation: this.fkInformation
        });

        this.$element.find('#table-information-container').clean();
        this.$element.find('#table-information-container').html(html);
    },

    /**
     * Se encarga de renderar todo el tema de la paginacion de la
     * data.
     *
     * @param {int} totalCount: la informacion total que existen en la base
     *                          de datos cuando no se tiene en cuenta
     *                          los filtros aplicados.
     *
     * @param {int} filterCount: la canitdad totales de valores que existen
     *                           teniendo en cuenta los filtro usados.
     *
     * @param {int} limit: la cantidad de elementos que se muestran en cada
     *                     pagina.
     *
     * @param {int} currentPage: la pagina actul que esta viendo el usuario
     */
    renderPaginationInformation: function(totalCount, filterCount, limit, currentPage) {

        // los tengo que limpiar aca arrbia para tener en cuenta el caso en donde
        // no hay informacion
        this.$element.find('#pagination-information-container').clean();
        this.$element.find('#count-information').clean();

        if (totalCount === 0) {
            // no hay informacion en la base de datos, asique no puedo hacer
            // nada
            return
        }

        if (filterCount === 0) {
            // en este caso no hay informacion porque la tabla no tiene
            // informacion o por los filtros que se aplicaron, pero si
            // hay en la base de datos
            this.$element.find('#count-information').html('Showing 0 to 0 out of 0 (' + totalCount + ')');
            return
        }

        var previousPages = 0;
        var nextPages = 0;
        var maxNumberOfPages = filterCount / limit;

        if (filterCount % limit === 0) {
            // en este caso le tengo que restar uno porque es justo cuando
            // es multiplo de la cantidad de paginas que se estan mostrando.
            maxNumberOfPages -= 1;
        }

        if (currentPage === 0) {
            // como estoy al principio de la pagina tengo que hacer
            // que se muestre las paginas siguientes.
            nextPages = 5;
        } else if (((currentPage + 1) * limit) == totalCount) {
            // en este caso estoy en la ultima pagina
            previousPages = 5;
        } else {
            previousPages = 3;
            nextPages = 3;
        }

        var html = '<ul class="pagination">';
        for (var i = currentPage - previousPages; i < currentPage; i++) {
            if (i < 0) {
                continue;
            }

            html += '<li><a href="#" class="pagination-page">' + (i + 1) + '</a></li>';
        }

        html += '<li class="active"><a href="#">' + (currentPage + 1) + '</a></li>';

        for (var j = currentPage  + 1; j < currentPage + nextPages; j++) {
            if (j > maxNumberOfPages) {
                continue;
            }
            html += '<li><a href="#" class="pagination-page">' + (j + 1) + '</a></li>';
        }

        html += '<ul>';
        this.$element.find('#pagination-information-container').html(html);
        this.$element.find('#count-information').html('Showing ' + (limit * currentPage + 1)  + ' to ' + Math.min(totalCount, (limit * (currentPage + 1) + 1)) + ' out of ' + filterCount + ' (' + totalCount + ')');
    }



});
