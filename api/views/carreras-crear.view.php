<?php require base_path('views/partials/head.php') ?>
<?php require base_path('views/partials/header.php') ?>

<main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Crear carrera</h1>

    <div class="max-w-lg mx-auto">
        <form method="post">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-2">
                    <label for="title" class="font-bold">Título</label>
                    <input type="text" id="title" name="title" class="border border-gray-300 p-2 rounded-md" required>
                </div> <!-- End title -->

                <div class="flex flex-col gap-2">
                    <label for="tipo" class="font-bold">Tipo</label>
                    <select name="tipo" id="tipo" class="border border-gray-300 p-2 rounded-md" required>
                        <option value="licenciatura">Licenciatura</option>
                        <option value="maestria">Maestría</option>
                        <option value="doctorado">Doctorado</option>
                    </select>
                </div> <!-- End tipo -->

                <div class="flex flex-col gap-2">
                    <label for="description" class="font-bold">Descripción</label>
                    <textarea title="Descripción" id="description" name="description" class="border border-gray-300 p-2 rounded-md"></textarea>
                </div> <!-- End description -->

                <div class="flex flex-col gap-2">
                    <label for="bg_color" class="font-bold">Color de fondo</label>
                    <input type="color" id="bg_color" name="bg_color" class="border border-gray-300 p-2 rounded-md">
                </div> <!-- End bg color -->

                <div class="flex flex-col gap-2">
                    <label for="imagen_banner" class="font-bold">Imagen del banner</label>

                    <div class="flex gap-4">
                        <div data-image-preview></div>
                        <input type="file" id="imagen_banner" name="imagen_banner" class="border border-gray-300 p-2 rounded-md">
                    </div>
                </div> <!-- End banner image -->

                <div class="flex flex-col gap-2">
                    <label for="foto_mascota" class="font-bold">Imagen mascota</label>

                    <div class="flex gap-4">
                        <div data-image-preview></div>
                        <input type="file" id="foto_mascota" name="foto_mascota" class="border border-gray-300 p-2 rounded-md">
                    </div>
                </div> <!-- End pet photo -->

                <div class="flex flex-col gap-2">
                    <label for="foto_ingreso" class="font-bold">Imagen de ingreso</label>

                    <div class="flex gap-4">
                        <div data-image-preview></div>
                        <input type="file" id="foto_ingreso" name="foto_ingreso" class="border border-gray-300 p-2 rounded-md">
                    </div>
                </div> <!-- End foto ingreso -->

                <div class="flex flex-col gap-2">
                    <label for="foto_egreso" class="font-bold">Imagen de egreso</label>

                    <div class="flex gap-4">
                        <div data-image-preview></div>
                        <input type="file" id="foto_egreso" name="foto_egreso" class="border border-gray-300 p-2 rounded-md">
                    </div>
                </div> <!-- End graduate photo -->

                <div class="flex justify-between">
                    <a href="/carreras" class="px-4 py-2 font-bold">Cancelar</a>
                    <button type="submit" class="bg-blue-500 px-4 py-2 text-white font-bold rounded-md">Guardar carrera</button>
                </div> <!-- End actions -->
            </div> <!-- End from wrapper -->
        </form> <!-- End form -->
    </div>
</main>

<script>
    $('[type=file]').change(function(event) {
        const target = event.target;
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            $(target).siblings('[data-image-preview]').html(`<img src="${this.result}" alt="Image Preview" width="100" height="100">`);
        }

        reader.readAsDataURL(file);
    })
</script>

<?php require base_path('views/partials/foot.php') ?>