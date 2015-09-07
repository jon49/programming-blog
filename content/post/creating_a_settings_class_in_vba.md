---
date: 2012-02-29
title: Creating a Settings Class in VBA
tags:
    - vba
    - settings
---

In .NET they have a nice settings class you can create using <a href="http://msdn.microsoft.com/en-us/library/system.configuration.applicationsettingsbase.aspx">ApplicationSettingsBase base class</a>. In VBA it takes a bit more work to get it working, but can be fairly elegant if done correctly.

Some criteria that is needed for a settings class in vba are:
<ul>
	<li>Well formed</li>
	<li>Fast lookup</li>
	<li>Default setting</li>
	<li>Single input/output procedures.</li>
</ul>
To make it well formed I used an <a href="http://www.cpearson.com/excel/Enums.aspx">enumeration variable type</a> to create each setting. I think string constants could accomplish the same thing.

To have a fast look up I use the <a href="http://support.microsoft.com/kb/187234">dictionary object</a>  which<a href="http://www.dotnetperls.com/dictionary-vbnet"> can look up values much faster than</a> the <a href="http://support.microsoft.com/kb/198465">collection object</a>.

Doing default settings is interesting. It took me some time to figure out how to do that. But all that is needed is an optional boolean value for the Get and Let procedures.

A single point to output your values to makes it easy to trouble shoot if something isn't working correctly. Also, the single input is just one procedure that grabs data from where ever you choose to store it and if it isn't stored then it will just grabs the default value.

Here's an example on how a property would look like:

``` vbscript
'In order to get default value an optional field is needed in the Get and Let procedures.
Public Property Get _
    Example(Optional ByVal bReturnDefault As Boolean = False) _
    As Double
    
    'Uses dictionary for look up of value (loads dictionary when creating new settings class.
    'SettingNames is the enumeration type.
    If mdicSettings.Exists(SettingNames.Example) _
        And Not bReturnDefault Then
    
        Example = CDbl(mdicSettings(SettingNames.Example))
    Else
        Example = 10
    End If
End Property

Public Property Let _
    Example(Optional ByVal bReturnDefault As Boolean = False _
    , ByVal dValue As Double)
    
    'Single point write (all values stored as string).
    'Note that the key is just the integer from the enumeration.
    AddSetting SettingNames.Example, CStr(dValue)
End Property
```
