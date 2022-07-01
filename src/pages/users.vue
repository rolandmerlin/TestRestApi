<template>
    <div class="text-center text-2xl">Les utilisateurs enregistrés sont :</div>
    <br>
    <div class="text-right"><u v-on:click="CreateUser()" class="cursor-pointer">Créer d'utilisateur</u></div>
    <br>
    <div class="userWrapTbl">
        <div class="usersTbl">
            <b>#</b>
            <b>Nom de l'utilisateur</b>
            <b>Adresse électronique</b>
            <b>Numéro de téléphone</b>
            <b></b>
        </div>
        <template v-for="(u,i) in users" :key="'user'+i">
            <div class="usersTbl even:bg-gray-100" v-if="u">
                <b>{{u.id}}</b>
                <span>{{u.name}}</span>
                <span>{{u.email}}</span>
                <span>{{u.phone}}</span>
                <u v-on:click="showDetailUser(u)" class="inline-block px-4">Détails</u>
                <u v-on:click="EditUser(u)" class="inline-block px-4">Editer</u>
                <u v-on:click="DeleteUser(u)" class="inline-block px-4">Supprimer</u> 
            </div>  
        </template>
    </div>
    <div v-if="user" class="overlay">
        <div class="overlay_win">
            <div class="usersTblGrid">
                <b>Détails pour</b><span>{{user.name}}</span>
                <b>Adresse électronique</b><span>{{user.email}}</span>
                <b>Numéro de téléphone</b><span>{{user.phone}}</span>
                <b>Site internet</b><a :href="'https://'+user.website" target="_blank" class="underline">{{user.website}}</a>
                <b class="h-auto">Adresse</b>
                    <span class="h-auto">
                        {{user?.address?.suite}}<br>
                        {{user?.address?.street}}<br>
                        {{user?.address?.zipcode}}&nbsp;{{user?.address?.city}}
                    </span>
            </div>
            <button v-on:click="user=false" class="w-full p-2">Fermer</button>
        </div>
    </div>
    <div v-if="edit" class="overlay">
        <div class="overlay_win w-[50%]">
            <div class="text-center font-bold text-2xl">Edition</div>
            <br>
            <div class="usersTblGrid">
                <b>Détails pour</b><span>{{edit.name}}</span>
                <b>Adresse électronique</b><input type="email" v-model="edit.email">
                <b>Numéro de téléphone</b><input type="tel" v-model="edit.phone">
                <b>Site internet</b><input type="text" v-model="edit.website">
                <b>&nbsp;</b><span>&nbsp;</span>
                <b>Adresse</b><span></span>
                <b>Numéro de rue/Apt</b><input type="text" v-model="edit.address.suite">
                <b>Nom de la rue</b><input type="text" v-model="edit.address.street">
                <b>Code postal</b><input type="text" v-model="edit.address.zipcode">
                <b>Ville</b><input type="text" v-model="edit.address.city">
            </div><br>
            <button v-on:click="SaveUser()" class="w-full p-2">Sauvegarder</button>
            <br>&nbsp;
            <button v-on:click="edit=false" class="w-full p-2 btn--secondary">Annuler</button>
        </div>
    </div>
    <div v-if="newuser" class="overlay">
        <div class="overlay_win w-[50%]">
            <div class="text-center font-bold text-2xl">Nouvel utilisateur</div>
            <br>
            <div class="usersTblGrid">
                <b>Détails pour</b><input type="text" v-model="newuser.name">
                <b>Adresse électronique</b><input type="email" v-model="newuser.email">
                <b>Numéro de téléphone</b><input type="tel" v-model="newuser.phone">
                <b>Site internet</b><input type="text" v-model="newuser.website">
                <b>&nbsp;</b><span>&nbsp;</span>
                <b>Adresse</b><span></span>
                <b>Numéro de rue/Apt</b><input type="text" v-model="newuser.address.suite">
                <b>Nom de la rue</b><input type="text" v-model="newuser.address.street">
                <b>Code postal</b><input type="text" v-model="newuser.address.zipcode">
                <b>Ville</b><input type="text" v-model="newuser.address.city">
            </div><br>
            <button v-on:click="SaveNewUser()" class="w-full p-2">Sauvegarder</button>
            <br>&nbsp;
            <button v-on:click="newuser=false" class="w-full p-2 btn--secondary">Annuler</button>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'

const users = ref([]) // liste des utlisateurs
const url = 'https://jsonplaceholder.typicode.com/users/' // URL de la requête

/* Affichage du détails d'utlisateur */
const user = ref(false)
function showDetailUser(u){ user.value = u }

/* Edition d'utilisateur */
const edit = ref(false)
function EditUser(u){ edit.value = u }
function SaveUser(){
    axios.put(url+edit.value.id,{...edit.value}).then(d =>{
        for (const key in users.value) if (users.value[key].id == d.data.id) users.value[key]=d.data
        edit.value = false
    }).catch(e => {
        alert('Impossible de mettre à jour cette enregistrement')
    })
}

/* Création d'utilisateur */
const newuser = ref(false)
function CreateUser(){
    newuser.value = {
        id:null,
        email:'',
        website:'',
        address:{
            suite:'',
            street:'',
            zipcode:'',
            city:''
        }
    }
}
function SaveNewUser(){
    axios.post(url,{...newuser.value}).then(d =>{
        users.value.push(d.data)
        newuser.value = false
    }).catch(e => {
        alert('Impossible de mettre à jour cette enregistrement')
    })
}

/* Suppresion d'uilisateur */
function DeleteUser(u){
    let deleteUserId = u.id
    if(window.confirm('Voulez-vous supprimer l\'utilisateur "'+u.name+'" ?\n [OK] pour comfimer / Sinon [Annuler] ')) ExecDeleteUser(deleteUserId)
}
function ExecDeleteUser(id){
    axios.delete(url+id).then(d => {
        for (const key in users.value)
            if(id == users.value[key].id) delete(users.value[key])
    }).catch(d => {
        console.log(d);
        alert('Impossible de supprimer cet utilisateur')
    })    
}

/* Chargement des utilisateurs */
axios.get(url).then(d => {
    users.value=d.data
}).catch(d=>{
    alert('Le site "'+url+'" n\'est joinable pour le moment')
})
</script>
<style>
    .userWrapTbl {
        @apply border-2 border-solid border-gray-200 p-[5px];
    }
    .usersTbl {
        @apply grid text-sm;
        grid-template-columns:50px 250px 4fr 4fr 1fr 1fr 1fr;
    }
    .usersTblGrid { @apply grid grid-cols-2; }
    .usersTblGrid>* { @apply p-[4px] leading-10 h-10; }
    .usersTbl>* { @apply p-2; }
    .usersTbl>u { @apply cursor-pointer; }

</style>