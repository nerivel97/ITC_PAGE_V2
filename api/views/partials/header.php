<header class="flex justify-between items-center bg-gray-800 text-white p-4">
    <h1>LOGO</h1>
    <nav>
        <ul class="flex gap-4">
            <li>
                <a href="/" class="<?= url_is('/') ? 'bg-gray-900' : '' ?> px-4 py-2 hover:bg-gray-50/10">
                    Inicio
                </a>
            </li>
            <li>
                <a href="/carreras" class="<?= url_is('/carreras') ? 'bg-gray-900' : '' ?> px-4 py-2 hover:bg-gray-50/10">
                    Carreras
                </a>
            </li>
        </ul>
    </nav>
</header>