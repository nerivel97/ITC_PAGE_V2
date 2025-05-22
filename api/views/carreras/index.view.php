<?php require base_path('views/partials/head.php') ?>
<?php require base_path('views/partials/header.php') ?>

<main class="container mx-auto p-4">
    <div class="mb-4">
        <h1 class="text-2xl font-bold mb-4">Todas las carreras</h1>
        <a href="/carreras/crear" class="bg-blue-500 px-4 py-2 rounded-md text-white">Crear carrera</a>
    </div>

    <ul class="space-y-4">
        <?php foreach ($careers as $career) : ?>
            <li>
                <a href="/carrera?id=<?= $career['id'] ?>" class="hover:underline">
                    <?= $career['title'] ?>
                </a>
            </li>
        <?php endforeach ?>
    </ul>
</main>

<?php require base_path('views/partials/foot.php') ?>