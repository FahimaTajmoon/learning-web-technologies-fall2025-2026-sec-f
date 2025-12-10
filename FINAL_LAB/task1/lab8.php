<?php
// 2D array
$data = array(
    array(1, 2, 3, 'A'),
    array(1, 2, 'B', 'C'),
    array(1, 'D', 'E', 'F')
);

// (a) Number shape (left side)
for ($row = 0; $row < 3; $row++) {
    for ($col = 0; $col < 3 - $row; $col++) {
        echo $data[$row][$col] . " ";
    }
    echo "<br>";
}

echo "<br>";

// (b) Letter shape (right side)
for ($row = 0; $row < 3; $row++) {
    for ($col = 3 - $row; $col < 4; $col++) {
        echo $data[$row][$col] . " ";
    }
    echo "<br> ";
    
}
?>
