<template>
    <v-container class="main__article">
        <v-parallax height="400" src="../assets/matrix_1.jpg">
            <div class="d-flex justify-center">
                <v-avatar class="ma-10 opacity-80" size="300">
                    <img src="../assets/profile.jpg" width="300">
                </v-avatar>
            </div>
        </v-parallax>

        <h2 class="article__title mt-10">Sobre mim,</h2><br>

        <p class="article__p">
            Sou desenvolvedor full-stack com experiência em projetos que abrangem desde aplicações web até
            sistemas escaláveis. Meu foco principal reside na utilização de tecnologias como Node.js, MongoDB
            para persistência de dados, e frameworks como Vue 3 e Nuxt.js para construção de interfaces dinâmicas e
            otimizadas. Além disso, tenho experiência com bibliotecas de UI como Vuetify, garantindo uma
            experiência de usuário fluida e responsiva.
            Minha abordagem de trabalho é pautada pela inovação e pela busca contínua por desafios que me permitam
            expandir meu conhecimento técnico e contribuir significativamente para o sucesso de projetos.
        </p>

        <h2 class="article__title mt-10">Background,</h2><br>

        <p class="article__p">
            Com mais de 2 anos dedicados ao desenvolvimento de software, estou finalizando minha formação em Análise e
            Desenvolvimento de Sistemas, consolidando meu conhecimento em práticas ágeis e arquiteturas modernas.
            Anteriormente, acumulei mais de 15 anos de experiência na área da saúde como farmacêutico e técnico em
            radiologia médica, o que me proporcionou uma base sólida em gestão de projetos e resolução de problemas
            complexos.
        </p>

        <h2 class="article__title mt-10">Sobre este projeto,</h2><br>

        <p class="article__p">
            Este aplicativo, "Inventário Psicológico", foi desenvolvido como uma ferramenta para auxiliar no registro
            diário dos defeitos psicológicos e virtudes, promovendo o autoconhecimento. Através dele, é possível
            identificar os pontos que impedem o despertar da consciência e a liberação da essência, facilitando o
            desenvolvimento pessoal.
        </p>
        <v-divider :thickness="1" class="border-opacity-50 mb-5 mt-5" color="white"></v-divider>
    </v-container>
</template>
