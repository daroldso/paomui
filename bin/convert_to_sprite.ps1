param($p1)

$path="$pwd\src\img\combine"

convert -append $path/*.png "$path/hp${p1}_paomui.png"
