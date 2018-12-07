<template>
    <div class="tinymce-container editor-container">
        <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
    </div>
</template>

<script>
    import editorOptions from '@/utils/editorOptions'

    export default {
        name: "Editor",
        props: {
            id: {
                type: String,
                default: function () {
                    return 'vue-tinymce-' + new Date() + ((Math.random() * 1000).toFixed(0) + '')
                }
            },
            value: {
                type: String,
                default: ''
            },
            height: {
                type: Number,
                required: false,
                default: 360
            }
        },
        data() {
            return {
                hasChange: false,
                hasInit: false,
                tinymceId: this.id
            }
        },
        watch: {
            value(val) {
                if (!this.hasChange && !this.hasInit) {
                    this.nextTick(() => {
                        window.tinymce.get(this.tinymceId).setContent(val || '');
                    })
                }
            }
        },
        mounted() {
            this.initTinymce();
        },
        activated() {
            this.initTinymce();
        },
        deactivated() {
            this.destroyTinymce();
        },
        destroyed() {
            this.destroyTinymce();
        },
        methods: {
            initTinymce() {
                const _this = this;
                window.tinymce.init({
                    language: 'zh_CN',
                    ...editorOptions,
                    selector: `#${_this.tinymceId}`,
                    height: _this.height,
                    images_upload_handler: (blobInfo, success, failure) => {
                        //图片上传相关
                    },
                    init_instance_callback: editor => {
                        if (_this.value) {
                            editor.setContent(_this.value)
                        }
                        _this.hasInit = true;
                        editor.on('NodeChange Change KeyUp SetContent', () => {
                            _this.hasChange = true;
                            _this.$emit('input', editor.getContent())
                        })
                    }
                })
            },
            setContent(value) {
                window.tinymce.get(this.tinymceId).setContent(value);
            },
            getContent() {
                window.tinymce.get(this.tinymceId).getContent();
            },
            destroyTinymce() {
                if (window.tinymce.get(this.tinymceId)) {
                    window.tinymce.get(this.tinymceId).destroy();
                }
            }
        }
    }
</script>

<style scoped>

</style>
