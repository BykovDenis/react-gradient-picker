<h1> React gradient picker component </h1>


<h2> Describe API </h2>

<h3> Input Properties </h3>

<table>
    <thead>
        <tr>
            <th>
                Parameter
            </th>
            <th>
                Type
            </th>
            <th>
                Description
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                gradient
            </td>
            <td>
                Array
            </td>
            <td>
                Array of objects
                <ul>
                    <li>
                        step: string
                    </li>
                    <li>
                        color: string
                    </li>
                    <li>
                        alpha: number
                    </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                visibleGradientCSS
            </td>
            <td>
                Boolean
            </td>
            <td>
                The condition to visible text css property background-image
            </td>
        </tr>
        <tr>
            <td>
                heightGradientPanel
            </td>
            <td>
                Number
            </td>
            <td>
               Height of gradient panel
            </td>
        </tr>
        <tr>
            <td>
                widthPoint
            </td>
            <td>
                Number
            </td>
            <td>
               width of points
            </td>
        </tr>
        <tr>
            <td>
                heightPoint
            </td>
            <td>
                Number
            </td>
            <td>
               Height of points
            </td>
        </tr>
    </tbody>
</table>

<h3> Methods </h3>

<table>
    <thead>
        <tr>
            <th>
                Parameter
            </th>
            <th>
                Type
            </th>
            <th>
                Return
            </th>
            <th>
                Description
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                changePaletteParam
            </td>
            <td>
                Function
            </td>
            <td>
                Array of objects
                <ul>
                <li>
                    key: number
                </li>
                <li>
                    step: string
                </li>
                <li>
                    color: string
                </li>
                <li>
                    alpha: string
                </li>
                <li>
                    active: boolean (sign to active point)
                </li>
                </ul>
            </td>
            <td>
                Apply the change palette params
            </td>
        </tr>
    </tbody>
</table>

