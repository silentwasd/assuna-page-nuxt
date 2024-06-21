<script setup lang="ts">
const {setLocale} = useI18n();
const locale = useCookie('locale');
setLocale(locale.value ?? 'ru-RU');

function switchLang(on: string) {
    setLocale(on);
    locale.value = on;
}

</script>

<template>
    <div class="grid grid-cols-3 gap-5">
        <h1 class="text-4xl text-center title2 mb-6">тест</h1>
                <button class="Test-block px-3 py-2 rounded-xl text-white text-lg"
                :class="{'bg-pink-950': locale === 'en-US'}"
                @click="switchLang('en-US')">English</button>

                
    </div>
    
</template>

<style scoped>
.title2 {
    font-family: 'Dela Gothic One', serif;
}

.title3 {
    font-family: 'Oswald', sans-serif;
}

.contact {
    font-family: 'Josefin Sans', sans-serif;
}

/*test*/


.Test-block {
  padding: 0px;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(15, 163, 160), rgb(214, 9, 190));
  color: rgb(255, 255, 255); 
  border: 3px solid;
  border-image:  linear-gradient(45deg, #39CCCC, #01FF70 ) 1;
  display: block; position: relative; height: 50px; width: 100%; 
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
  transform: translate3d(0, 0, 0);
  
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}



</style>

