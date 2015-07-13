<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Examples</title>
<style>
body{margin: 0;}
table{
	border-collapse: collapse;
	width: 100%;
}
td{
	border:1px solid #eee;
	padding: 0;
	font-size: 12px;
	text-align: center;
}

</style>
</head>
<body>
<table>
	<thead>
		<tr>
			<td>16进制</td>
			<td>0</td>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td>6</td>
			<td>7</td>
			<td>8</td>
			<td>9</td>
			<td>A</td>
			<td>B</td>
			<td>C</td>
			<td>D</td>
			<td>E</td>
			<td>F</td>
		</tr>
	</thead>
	<tbody>
<?php
	$min1 = hexdec("1F300");
	$max1 = hexdec("1F6Ff");

	$min2 = hexdec("2600");
	$max2 = hexdec("26FF");

	$td = "";
	for ($i=$min1; $i < $max1; $i++) { 
		$td .="<td>&#x".dechex($i).";</td>\n\t\t\t";
		if ($i % 16 == 15) {
			echo "\n\t\t".
				"<tr>\n\t\t\t".
					"<td>".dechex($i)."</td>".
					"\n\t\t\t".$td."\n\t\t".
				"</tr>";
			$td = "";
		}
	}

	$td2 = "";
	for ($i=$min2; $i < $max2; $i++) { 
		$td2 .="<td>&#x".dechex($i).";</td>\n\t\t\t";
		if ($i % 16 == 15) {
			echo "\n\t\t".
				"<tr>\n\t\t\t".
					"<td>".dechex($i)."</td>".
					"\n\t\t\t".$td2."\n\t\t".
				"</tr>";
			$td2 = "";
		}
	}
?>
	</tbody>
</table>
</body>
</html>
