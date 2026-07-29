/*====================================================
                CATTE COELHO WEBSITE
                script.js
====================================================*/

document.addEventListener("DOMContentLoaded", () => {


    /*==============================================
                LANGUAGE AND MESSAGES
    ==============================================*/

    const pageLanguage =
        document.documentElement.lang.toLowerCase();

    const isEnglish =
        pageLanguage.startsWith("en");


   const messages = {

    invalidEmail: isEnglish
        ? "Please enter a valid email address."
        : "Introduza um endereço de email válido.",

    noBooks: isEnglish
        ? "There are no published books at the moment."
        : "Não existem livros publicados neste momento.",

    booksError: isEnglish
        ? "The books could not be loaded."
        : "Não foi possível carregar os livros.",

    learnMore: isEnglish
        ? "Learn more"
        : "Saber mais",

    bookCoverAlt: isEnglish
        ? "Book cover"
        : "Capa do livro",

    noEvents: isEnglish
        ? "There are no scheduled events at the moment."
        : "Não existem eventos agendados neste momento.",

    eventsError: isEnglish
        ? "The events could not be loaded."
        : "Não foi possível carregar os eventos.",

    galleryError: isEnglish
        ? "The gallery could not be loaded."
        : "Não foi possível carregar a galeria.",

    galleryAlt: isEnglish
        ? "Catte Coelho gallery"
        : "Galeria de Catte Coelho"

};


    /*==============================================
                NAVBAR ON SCROLL
    ==============================================*/

    const navbar =
        document.querySelector(".navbar-custom");


    function navbarScroll() {

        if (!navbar) {

            return;

        }


        if (window.scrollY > 40) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    }


    navbarScroll();


    window.addEventListener(
        "scroll",
        navbarScroll,
        {
            passive: true
        }
    );


    /*==============================================
                BACK TO TOP
    ==============================================*/

    const backToTop =
        document.getElementById("backToTop");


    function toggleBackToTop() {

        if (!backToTop) {

            return;

        }


        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    toggleBackToTop();


    window.addEventListener(
        "scroll",
        toggleBackToTop,
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /*==============================================
                ACTIVE NAV LINK
    ==============================================*/

    const sections =
        document.querySelectorAll(
            "section, header"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function activeLink() {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;


            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id") || "";

            }

        });


        navLinks.forEach(link => {

            const linkTarget =
                link.getAttribute("href");


            link.classList.toggle(

                "active",

                linkTarget === `#${current}`

            );

        });

    }


    activeLink();


    window.addEventListener(
        "scroll",
        activeLink,
        {
            passive: true
        }
    );

        /*==============================================
                SCROLL REVEAL
    ==============================================*/

    const revealSelector = [

        "section",

        ".book-card",

        ".blog-card",

        ".testimonial-card",

        ".timeline-item"

    ].join(", ");


    const revealObserver =

        "IntersectionObserver" in window

            ? new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {

                            return;

                        }


                        entry.target.classList.add(
                            "show-element"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },

                {

                    threshold: 0.15

                }

            )

            : null;


    function observeRevealElements(root = document) {

        const elements =
            root.querySelectorAll(
                revealSelector
            );


        elements.forEach(element => {

            if (
                element.dataset.revealObserved ===
                "true"
            ) {

                return;

            }


            element.dataset.revealObserved =
                "true";


            if (!revealObserver) {

                element.classList.add(
                    "show-element"
                );

                return;

            }


            element.classList.add(
                "hidden-element"
            );


            revealObserver.observe(
                element
            );

        });

    }


    observeRevealElements();


    /*==============================================
                LIGHTBOX
    ==============================================*/

    const lightbox =
        document.getElementById("lightbox");


    const lightboxImage =
        document.querySelector(
            ".lightbox-image"
        );


    const lightboxClose =
        document.querySelector(
            ".lightbox-close"
        );


    function openLightbox(galleryItem) {

        if (
            !lightbox ||
            !lightboxImage
        ) {

            return;

        }


        const image =
            galleryItem.querySelector("img");


        const imageSource =

            galleryItem.getAttribute("href") ||

            image?.currentSrc ||

            image?.src;


        if (!imageSource) {

            return;

        }


        lightboxImage.src =
            imageSource;


        lightboxImage.alt =

            image?.alt ||

            messages.galleryAlt;


        lightbox.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        if (!lightbox) {

            return;

        }


        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";


        if (lightboxImage) {

            lightboxImage.src = "";

        }

    }


    /*
        Usamos event delegation para a lightbox
        também funcionar com imagens carregadas
        dinamicamente através do gallery.json.
    */

    document.addEventListener(
        "click",
        event => {

            const galleryItem =
                event.target.closest(
                    ".gallery-item"
                );


            if (!galleryItem) {

                return;

            }


            event.preventDefault();


            openLightbox(
                galleryItem
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (

                event.key === "Escape" &&

                lightbox?.classList.contains(
                    "active"
                )

            ) {

                closeLightbox();

            }

        }
    );


    /*==============================================
                MOBILE MENU
    ==============================================*/

    const menuLinks =
        document.querySelectorAll(
            ".navbar-nav .nav-link"
        );


    const navbarCollapse =
        document.querySelector(
            ".navbar-collapse"
        );


    menuLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (

                    !navbarCollapse ||

                    !navbarCollapse
                        .classList
                        .contains("show")

                ) {

                    return;

                }


                if (

                    typeof bootstrap !==
                    "undefined" &&

                    bootstrap.Collapse

                ) {

                    bootstrap.Collapse
                        .getOrCreateInstance(
                            navbarCollapse
                        )
                        .hide();

                } else {

                    navbarCollapse
                        .classList
                        .remove("show");

                }

            }
        );

    });


    /*==============================================
                SMOOTH SCROLL
    ==============================================*/

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    /*
                        Evita erros em links
                        temporários com href="#".
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });

            /*==============================================
                NEWSLETTER
    ==============================================*/

    const newsletter =
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletter) {

        newsletter.addEventListener(
            "submit",
            function (event) {

                const email =
                    this.querySelector(
                        'input[type="email"]'
                    );


                const regex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !email ||
                    !regex.test(
                        email.value.trim()
                    )
                ) {

                    event.preventDefault();


                    alert(
                        messages.invalidEmail
                    );


                    email?.focus();


                    return;

                }


                const action =
                    this.getAttribute(
                        "action"
                    );


                const hasNewsletterService =

                    action &&

                    action.trim() !== "" &&

                    action.trim() !== "#" &&

                    !action
                        .trim()
                        .toLowerCase()
                        .startsWith(
                            "javascript:"
                        );


                /*
                    Se existir um action do Brevo,
                    Mailchimp ou outro serviço,
                    o formulário é enviado normalmente.
                */

                if (
                    hasNewsletterService
                ) {

                    return;

                }


                event.preventDefault();


                alert(
                    messages.newsletterNotConnected
                );

            }
        );

    }


    /*==============================================
                CONTACT FORM
    ==============================================*/

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const inputs =
                    this.querySelectorAll(
                        "input, textarea"
                    );


                let valid = true;


                inputs.forEach(input => {

                    const isEmpty =
                        input.value.trim() === "";


                    input.classList.toggle(
                        "is-invalid",
                        isEmpty
                    );


                    if (isEmpty) {

                        valid = false;

                    }

                });


                if (!valid) {

                    alert(
                        messages.completeFields
                    );


                    return;

                }


                alert(
                    messages.messageSent
                );


                this.reset();

            }
        );

    }


    /*==============================================
                HOVER EFFECT BOOKS
    ==============================================*/

    const cards =
        document.querySelectorAll(
            ".book-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });

        /*==============================================
                DYNAMIC EVENTS
    ==============================================*/

    async function loadEvents() {

        const eventsContainer =
            document.getElementById(
                "events-list"
            );


        /*
            Se ainda estiveres a usar os eventos
            escritos diretamente no HTML,
            a função não faz nada.
        */

        if (!eventsContainer) {

            return;

        }


        try {

            const response =
                await fetch(
                    "content/events.json",
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Erro HTTP: ${response.status}`
                );

            }


            const data =
                await response.json();


            const events =
                Array.isArray(data.events)
                    ? [...data.events]
                    : [];


            /*
                Ordena os eventos pela data.
            */

            events.sort(
                (
                    firstEvent,
                    secondEvent
                ) => {

                    return (

                        parseEventDate(
                            firstEvent.date
                        ) -

                        parseEventDate(
                            secondEvent.date
                        )

                    );

                }
            );


            eventsContainer.replaceChildren();


            /*
                Caso não existam eventos.
            */

            if (events.length === 0) {

                const emptyMessage =
                    document.createElement("p");


                emptyMessage.className =
                    "events-empty";


                emptyMessage.textContent =
                    messages.noEvents;


                eventsContainer.appendChild(
                    emptyMessage
                );


                return;

            }


            /*
                Criação dos eventos no HTML.
            */

            events.forEach(eventData => {

                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "timeline-item";


                const date =
                    document.createElement(
                        "div"
                    );


                date.className =
                    "timeline-date";


                date.textContent =
                    formatEventDate(

                        eventData.date,

                        eventData.displayDate

                    );


                const content =
                    document.createElement(
                        "div"
                    );


                content.className =
                    "timeline-content";


                const title =
                    document.createElement(
                        "h4"
                    );


                title.textContent =
                    eventData.title || "";


                const location =
                    document.createElement(
                        "span"
                    );


                location.textContent =
                    eventData.location || "";


                const description =
                    document.createElement(
                        "p"
                    );


                description.textContent =
                    eventData.description || "";


                content.append(

                    title,

                    location,

                    description

                );


                article.append(

                    date,

                    content

                );


                eventsContainer.appendChild(
                    article
                );

            });


            /*
                Aplica a animação aos eventos
                criados dinamicamente.
            */

            observeRevealElements(
                eventsContainer
            );


            activeLink();

        } catch (error) {

            console.error(
                "Erro ao carregar eventos:",
                error
            );


            eventsContainer.replaceChildren();


            const errorMessage =
                document.createElement("p");


            errorMessage.className =
                "events-empty";


            errorMessage.textContent =
                messages.eventsError;


            eventsContainer.appendChild(
                errorMessage
            );

        }

    }


    /*==============================================
                EVENT DATE HELPERS
    ==============================================*/

    function parseEventDate(value) {

        if (!value) {

            return Number.MAX_SAFE_INTEGER;

        }


        /*
            Adiciona uma hora local para evitar que
            o browser altere o dia devido ao fuso horário.
        */

        const normalizedValue =

            /^\d{4}-\d{2}-\d{2}$/.test(value)

                ? `${value}T00:00:00`

                : value;


        const date =
            new Date(normalizedValue);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return Number.MAX_SAFE_INTEGER;

        }


        return date.getTime();

    }


    function formatEventDate(
        dateValue,
        customDisplayDate
    ) {

        /*
            Usa primeiro o texto definido manualmente
            no events.json, por exemplo "14 JUL".
        */

        if (

            typeof customDisplayDate ===
                "string" &&

            customDisplayDate.trim() !== ""

        ) {

            return customDisplayDate
                .trim()
                .toUpperCase();

        }


        if (!dateValue) {

            return "";

        }


        const normalizedValue =

            /^\d{4}-\d{2}-\d{2}$/.test(
                dateValue
            )

                ? `${dateValue}T00:00:00`

                : dateValue;


        const date =
            new Date(normalizedValue);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "";

        }


        const locale =
            isEnglish
                ? "en-GB"
                : "pt-PT";


        return new Intl.DateTimeFormat(
            locale,
            {

                day: "2-digit",

                month: "short"

            }
        )
            .format(date)
            .replace(".", "")
            .toUpperCase();

    }

        /*==============================================
                DYNAMIC BOOKS
    ==============================================*/

    async function loadBooks() {

        const booksContainer =
            document.getElementById(
                "books-list"
            );


        if (!booksContainer) {

            return;

        }


        try {

            const response =
                await fetch(
                    "./content/books.json",
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Erro HTTP: ${response.status}`
                );

            }


            const data =
                await response.json();


            const books =
                Array.isArray(data.books)
                    ? data.books.filter(
                        book =>
                            book.visible !== false
                    )
                    : [];


            booksContainer.replaceChildren();


            if (books.length === 0) {

                const column =
                    document.createElement(
                        "div"
                    );


                column.className =
                    "col-12";


                const emptyMessage =
                    document.createElement(
                        "p"
                    );


                emptyMessage.className =
                    "books-empty text-center";


                emptyMessage.textContent =
                    messages.noBooks;


                column.appendChild(
                    emptyMessage
                );


                booksContainer.appendChild(
                    column
                );


                return;

            }


            books.forEach(bookData => {

                const column =
                    document.createElement(
                        "div"
                    );


                column.className =
                    "col-lg-4 col-md-6";


                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "book-card";


                const imageContainer =
                    document.createElement(
                        "div"
                    );


                imageContainer.className =
                    "book-image";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    normalizeContentPath(
                        bookData.cover
                    );


                image.alt =
                    getBookText(
                        bookData,
                        "alt"
                    ) ||
                    messages.bookCoverAlt;


                image.loading =
                    "lazy";


                image.className =
                    "img-fluid";


                const content =
                    document.createElement(
                        "div"
                    );


                content.className =
                    "book-content";


                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    getBookText(
                        bookData,
                        "title"
                    );


                const description =
                    document.createElement(
                        "p"
                    );


                description.textContent =
                    getBookText(
                        bookData,
                        "description"
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    bookData.link || "#";


                link.className =
                    "book-link";


                if (
                    bookData.link &&
                    bookData.link !== "#"
                ) {

                    link.target =
                        "_blank";


                    link.rel =
                        "noopener noreferrer";

                }


                const linkText =
                    document.createElement(
                        "span"
                    );


                linkText.textContent =
                    messages.learnMore;


                const icon =
                    document.createElement(
                        "i"
                    );


                icon.className =
                    "bi bi-arrow-right";


                link.append(
                    linkText,
                    icon
                );


                imageContainer.appendChild(
                    image
                );


                content.append(
                    title,
                    description,
                    link
                );


                article.append(
                    imageContainer,
                    content
                );


                column.appendChild(
                    article
                );


                booksContainer.appendChild(
                    column
                );

            });


            observeRevealElements(
                booksContainer
            );


            bindBookHoverEffects(
                booksContainer
            );


            activeLink();

        } catch (error) {

            console.error(
                "Erro ao carregar livros:",
                error
            );


            booksContainer.replaceChildren();


            const column =
                document.createElement(
                    "div"
                );


            column.className =
                "col-12";


            const errorMessage =
                document.createElement(
                    "p"
                );


            errorMessage.className =
                "books-empty text-center";


            errorMessage.textContent =
                messages.booksError;


            column.appendChild(
                errorMessage
            );


            booksContainer.appendChild(
                column
            );

        }

    }


    /*==============================================
                BOOK LANGUAGE HELPER
    ==============================================*/

    function getBookText(
        book,
        field
    ) {

        const languageSuffix =
            isEnglish
                ? "en"
                : "pt";


        const preferredValue =
            book[
                `${field}_${languageSuffix}`
            ];


        if (
            typeof preferredValue === "string" &&
            preferredValue.trim() !== ""
        ) {

            return preferredValue.trim();

        }


        /*
            Caso a tradução não esteja preenchida,
            tenta utilizar a outra língua.
        */

        const fallbackSuffix =
            isEnglish
                ? "pt"
                : "en";


        const fallbackValue =
            book[
                `${field}_${fallbackSuffix}`
            ];


        return typeof fallbackValue === "string"
            ? fallbackValue.trim()
            : "";

    }


    /*==============================================
            DYNAMIC BOOK HOVER EFFECT
    ==============================================*/

    function bindBookHoverEffects(
        root = document
    ) {

        const bookCards =
            root.querySelectorAll(
                ".book-card"
            );


        bookCards.forEach(card => {

            if (
                card.dataset.hoverBound ===
                "true"
            ) {

                return;

            }


            card.dataset.hoverBound =
                "true";


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

    }
    
        /*==============================================
                DYNAMIC GALLERY
    ==============================================*/

    async function loadGallery() {

        const galleryContainer =
            document.getElementById(
                "gallery-list"
            );


        /*
            Se ainda estiveres a usar as imagens
            diretamente no HTML, a função não faz nada.
        */

        if (!galleryContainer) {

            return;

        }


        try {

            const response =
                await fetch(
                    "content/gallery.json",
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Erro HTTP: ${response.status}`
                );

            }


            const data =
                await response.json();


            const images =
                Array.isArray(data.images)
                    ? data.images
                    : [];


            galleryContainer.replaceChildren();


            /*
                Criação das imagens no HTML.
            */

            images.forEach(imageData => {

                const imagePath =
                    normalizeContentPath(
                        imageData.image
                    );


                if (!imagePath) {

                    return;

                }


                const column =
                    document.createElement(
                        "div"
                    );


                column.className =
                    "col-lg-4 col-md-6";


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    imagePath;


                link.className =
                    "gallery-item";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    imagePath;


                image.alt =
                    imageData.alt ||
                    messages.galleryAlt;


                image.loading =
                    "lazy";


                image.className =
                    "img-fluid";


                link.appendChild(
                    image
                );


                column.appendChild(
                    link
                );


                galleryContainer.appendChild(
                    column
                );

            });


            /*
                Não é necessário voltar a associar
                eventos à lightbox porque na Parte 2
                utilizámos event delegation.
            */

            activeLink();

        } catch (error) {

            console.error(
                "Erro ao carregar galeria:",
                error
            );


            galleryContainer.replaceChildren();


            const column =
                document.createElement(
                    "div"
                );


            column.className =
                "col-12";


            const errorMessage =
                document.createElement(
                    "p"
                );


            errorMessage.className =
                "gallery-empty";


            errorMessage.textContent =
                messages.galleryError;


            column.appendChild(
                errorMessage
            );


            galleryContainer.appendChild(
                column
            );

        }

    }


    /*==============================================
                IMAGE PATH HELPER
    ==============================================*/

    function normalizeContentPath(path) {

        if (

            typeof path !== "string" ||

            path.trim() === ""

        ) {

            return "";

        }


        const cleanPath =
            path.trim();


        /*
            Mantém URLs externas e imagens base64.
        */

        if (

            cleanPath.startsWith("http://") ||

            cleanPath.startsWith("https://") ||

            cleanPath.startsWith("data:")

        ) {

            return cleanPath;

        }


        /*
            Converte:
            /assets/gallery/photo.jpg

            Para:
            assets/gallery/photo.jpg

            Isto evita problemas quando o site está
            publicado dentro de uma subpasta.
        */

        return cleanPath.replace(
            /^\/+/,
            ""
        );

    }

        /*==============================================
            LOAD EDITABLE CONTENT
    ==============================================*/

        Promise.allSettled([

            loadBooks(),

            loadEvents(),

            loadGallery()

        ]);


    /*==============================================
            PRELOADER
    ==============================================*/

    function markPageAsLoaded() {

        document.body.classList.add(
            "loaded"
        );

    }


    if (
        document.readyState ===
        "complete"
    ) {

        markPageAsLoaded();

    } else {

        window.addEventListener(
            "load",
            markPageAsLoaded,
            {
                once: true
            }
        );

    }

});