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

    <script>
        const career = <?= json_encode($career) ?>;
        document.querySelector('pre').textContent = JSON.stringify(career, null, 2);
    </script>

</main>

<?php require base_path('views/partials/foot.php') ?>