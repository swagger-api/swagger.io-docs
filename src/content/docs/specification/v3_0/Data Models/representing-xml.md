---
title: Representing XML
sidebar:
  order: 7
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

In your API specification, you can describe data in both XML and JSON formats as they are easily interchangeable. For example, the following declaration —

```yaml
components:
  schemas:
    book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        author:
          type: string
```

— is represented in the following way in JSON and XML:

JSON

```yaml
{ "id": 0, "title": "string", "author": "string" }
```

XML

```xml
<book>
  <id>0</id>
  <title>string</title>
  <author>string</author>
</book>
```

As you can see, in XML representation, the object name serves as a parent element and properties are translated to child elements. The OpenAPI 3 format offers a special `xml` object to help you fine-tune representation of XML data. You can use this object to transform some properties to attributes rather than elements, to change element names, to add namespaces and to control transformations of array items.

### Change Element Names

By default, XML elements get the same names that fields in the API declaration have. To change the default behavior, add the `xml/name` field to your spec:

**Element name**

Specification

```yaml
components:
  schemas:
    book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        author:
          type: string
      xml:
        name: "xml-book"
```

XML

```xml
<xml-book>
  <id>0</id>
  <title>string</title>
  <author>string</author>
</xml-book>
```

**Attribute name**

Specification

```yaml
components:
  schemas:
    book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
          xml:
            name: "xml-title"
        author:
          type: string
```

XML

```xml
<book>
  <id>0</id>
  <xml-title>string</xml-title>
  <author>string</author>
</book>
```

For arrays, the `xml/name` property works only if another property – `xml/wrapped` – is set to `true`. See below.

### Convert Property to an Attribute

As we said above, by default, properties are transformed to child elements of the parent “object” element. To make some property an attribute in the resulting XML data, use the `xml/attribute`:

Specification

```yaml
book:
  type: object
  properties:
    id:
      type: integer
      xml:
        attribute: true
    title:
      type: string
    author:
      type: string
```

XML

```xml
<book id="0">
  <title>string</title>
  <author>string</author>
</book>
```

This works only for properties. Using `xml/attribute` for objects is meaningless.

### Prefixes and Namespaces

To avoid element name conflicts, you can specify namespace and prefix for elements. The namespace value must be an absolute URI:

```yaml
xml:
  prefix: "smp"
  namespace: "http://example.com/schema"
```

Namespace prefixes will be ignored for JSON:

```yaml
{ "author": "Mark Twain" }
```

The example below shows how you can add namespaces and prefixes:

Specification

```yaml
book:
  type: object
  properties:
    id:
      type: integer
    title:
      type: string
    author:
      type: string
  xml:
    prefix: "smp"
    namespace: "http://example.com/schema"
```

XML

```xml
<smp:book xmlns:smp="http://example.com/schema">
  <id>0</id>
  <title>string</title>
  <author>string</author>
</smp:book>
```

If needed, you can specify only `prefix` (This works in case the namespace is defined in some parent element). You can also specify prefixes for attributes.

### Wrapping Arrays

Arrays are translated as a sequence of elements of the same name:

Specification

```yaml
books:
  type: array
  items:
    type: string
  example:
    - "one"
    - "two"
    - "three"
```

XML

```xml
<books>one</books>
<books>two</books>
<books>three</books>
```

If needed, you can add a wrapping element by using the `xml/wrapped` property:

Specification

```yaml
books:
  type: array
  items:
    type: string
  xml:
    wrapped: true
  example:
    - "one"
    - "two"
    - "three"
```

XML

```xml
<books>
  <books>one</books>
  <books>two</books>
  <books>three</books>
</books>
```

As you can see, by default, the wrapping element has the same name as item elements. Use `xml/name` to give different names to the wrapping element and array items (this will help you resolve possible naming issues):

Specification

```yaml
books:
  type: array
  items:
    type: string
    xml:
      name: "item"
  xml:
    wrapped: true
    name: books-array
  example:
    - "one"
    - "two"
    - "three"
```

XML

```xml
<books-array>
  <item>one</item>
  <item>two</item>
  <item>three</item>
</books-array>
```

Note that the `xml.name` property of the wrapping element (`books` in our example) has effect only if `wrapped` is _true_. If `wrapped` is _false_, `xml.name` of the wrapping element is ignored.

### Reference

[XML Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#xmlObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
