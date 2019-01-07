<template>
    <f7-page>
        <f7-navbar :title="truck ? 'Редактирование' : 'Добавить Грузовик'" back-link="Back"></f7-navbar>
        <f7-list form>
            <f7-list-item>
                <f7-label>Название</f7-label>
                <f7-input type="text"
                          :value="formData.nameTruck"
                          @input="formData.nameTruck = $event.target.value"
                          placeholder="Название"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Цена</f7-label>
                <f7-input type="number"
                          :value="formData.price"
                          @input="formData.price = $event.target.value"
                          placeholder="Цена"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Комментарий</f7-label>
                <f7-input type="textarea"
                          :value="formData.comment"
                          @input="formData.comment = $event.target.value"
                          placeholder="Комментарий"></f7-input>
            </f7-list-item>
        </f7-list>
        <f7-block>
            <f7-button class="col" raised fill color="green" @click="truck ? patch() : add()">{{ truck ?
                'Редактировать' : 'Добавить' }}
            </f7-button>
        </f7-block>
        <div v-if="loading" class="preloader-overlay">
            <div class="preloader color-blue"></div>
        </div>
    </f7-page>
</template>

<script>

    import Service from '../service';

    export default {

        data() {
            return {
                truck: null,
                formData: {
                    nameTruck: "",
                    comment: "",
                    price: 0
                },
                loading: false
            };
        },

        methods: {

            validate() {
                if (this.formData.nameTruck.trim() === "" || this.formData.price === 0) {
                    Service.notify(this, '<h3>Заполните поля</h3>', 'Следующие поля обязательны для заполнения: Название, Цена');
                    return false;
                }
                return true;
            },

            patch() {

                this.loading = true;

                if (this.validate())

                    Service.axios()
                        .patch($params.patchTruck + this.truck.id, this.formData, {
                            headers: {"Content-Type": "application/x-www-form-urlencoded"}
                        })
                        .then(response => {
                            if (response.statusText !== 'OK') {
                                Service.notify(this, '<h3>Ошибка</h3>', 'Не удалось загрузить данные.');
                                this.loading = false;
                                return false;
                            }
                            this.$f7router.navigate('/');

                        });

                else this.loading = false;
            },

            add() {

                this.loading = true;

                if (this.validate())

                    Service.axios()
                        .post($params.addTruck, this.formData, {headers: {
                            "Content-Type": "application/x-www-form-urlencoded"}
                        })
                        .then(response => {
                            if (response.statusText !== 'OK') {
                                Service.notify(this, '<h3>Ошибка</h3>', 'Не удалось загрузить данные.');
                                this.loading = false;
                                return false;
                            }
                            this.$f7router.navigate('/');
                            this.loading = false
                        });

                else this.loading = false;
            }

        },

        created() {
            this.truck = (typeof this.$root.truck !== "undefined" && this.$root.truck) ? this.$root.truck : null;
            this.formData.nameTruck = this.truck ? this.truck.nameTruck : "";
            this.formData.comment = this.truck ? this.truck.comment : "";
            this.formData.price = this.truck ? this.truck.price : 0;
        }
    }
</script>