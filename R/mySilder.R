# AUTO GENERATED FILE - DO NOT EDIT

mySilder <- function(id=NULL, picUrl=NULL, step=NULL, value=NULL) {
    
    props <- list(id=id, picUrl=picUrl, step=step, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MySilder',
        namespace = 'my_silder',
        propNames = c('id', 'picUrl', 'step', 'value'),
        package = 'mySilder'
        )

    structure(component, class = c('dash_component', 'list'))
}
