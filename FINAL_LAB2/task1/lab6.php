<?php
$arr    = array(5, 12, 23, 34, 45, 56);
$search = 34;         
$found = false;

foreach ($arr as $value) {
    if ($value == $search) {
        $found = true;
        break;
    }
}

if ($found) {
    echo "$search found in the array.";
} else {
    echo "$search not found in the array.";
}
?>
