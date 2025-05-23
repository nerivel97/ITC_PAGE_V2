<?php require base_path('views/partials/head.php') ?>
<?php require base_path('views/partials/header.php') ?>

<main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
        <?= $heading ?>
    </h1>

    <div class="mb-4">
        <a href="/carreras" class="text-blue-500 underline">Regresar</a>
    </div>

    <pre>
        <?= json_encode($career) ?>
    </pre>

    <form class="mt-6" method="post">
        <input type="hidden" name="_method" value="DELETE">
        <input type="hidden" name="id" value="<?= $career['id'] ?>">
        <button type="submit" class="text-red-500 underline cursor-pointer">Eliminar carrera</button>
    </form>

</main>

<script>
    const career = <?= json_encode($career) ?>;
    document.querySelector('pre').textContent = JSON.stringify(career, null, 2);
</script>

<?php require base_path('views/partials/foot.php') ?>