# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class MySilder(Component):
    """A MySilder component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks.
- picUrl (string; optional): The value displayed in the input.
- step (number; optional): A label that will be printed when this component is rendered.
- value (string | number | dict | list; optional): The value displayed in the input."""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, picUrl=Component.UNDEFINED, step=Component.UNDEFINED, value=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'picUrl', 'step', 'value']
        self._type = 'MySilder'
        self._namespace = 'my_silder'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'picUrl', 'step', 'value']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(MySilder, self).__init__(**args)
