<?php
$a = 10;
$b = 25;
$c = 15;

$largest = $a; 
if ($b > $largest) {
    $largest = $b;
}
if ($c > $largest) {
    $largest = $c;
}
echo "Largest number is $largest";
?>
