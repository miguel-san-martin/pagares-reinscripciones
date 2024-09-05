'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">pagares-reinscripciones documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminConfigConfiguracionModule.html" data-type="entity-link" >AdminConfigConfiguracionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CampingModule.html" data-type="entity-link" >CampingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CampingModule-6fa2f16612a3d6f65d17d054b4a70b03c995ba217cd5a896d2cbbb6d44bfbcc4f2b1da202c98e3c995c8286eac7c0b73a42461932f91b5016fc34a7061b54638"' : 'data-bs-target="#xs-components-links-module-CampingModule-6fa2f16612a3d6f65d17d054b4a70b03c995ba217cd5a896d2cbbb6d44bfbcc4f2b1da202c98e3c995c8286eac7c0b73a42461932f91b5016fc34a7061b54638"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CampingModule-6fa2f16612a3d6f65d17d054b4a70b03c995ba217cd5a896d2cbbb6d44bfbcc4f2b1da202c98e3c995c8286eac7c0b73a42461932f91b5016fc34a7061b54638"' :
                                            'id="xs-components-links-module-CampingModule-6fa2f16612a3d6f65d17d054b4a70b03c995ba217cd5a896d2cbbb6d44bfbcc4f2b1da202c98e3c995c8286eac7c0b73a42461932f91b5016fc34a7061b54638"' }>
                                            <li class="link">
                                                <a href="components/DialogAnimationsExampleDialog.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogAnimationsExampleDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrecioDependienteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrecioDependienteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrecioExternoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrecioExternoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreciosExtraComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreciosExtraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VeranoCampamentoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VeranoCampamentoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EspecialidadBachillerModule.html" data-type="entity-link" >EspecialidadBachillerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GrupoConcursoMaestroModule.html" data-type="entity-link" >GrupoConcursoMaestroModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GrupoConcursoMaestroModule-7ad52dc0c62cbc07dba5999a5e2f13a6f8af1a3ab782a92adf7c4e1df812184d2589857b458c7c3055a5f848f613efb3cb4ca034732e39be0e39433ae75737af"' : 'data-bs-target="#xs-components-links-module-GrupoConcursoMaestroModule-7ad52dc0c62cbc07dba5999a5e2f13a6f8af1a3ab782a92adf7c4e1df812184d2589857b458c7c3055a5f848f613efb3cb4ca034732e39be0e39433ae75737af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GrupoConcursoMaestroModule-7ad52dc0c62cbc07dba5999a5e2f13a6f8af1a3ab782a92adf7c4e1df812184d2589857b458c7c3055a5f848f613efb3cb4ca034732e39be0e39433ae75737af"' :
                                            'id="xs-components-links-module-GrupoConcursoMaestroModule-7ad52dc0c62cbc07dba5999a5e2f13a6f8af1a3ab782a92adf7c4e1df812184d2589857b458c7c3055a5f848f613efb3cb4ca034732e39be0e39433ae75737af"' }>
                                            <li class="link">
                                                <a href="components/PageConsultaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageConsultaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagaresModule.html" data-type="entity-link" >PagaresModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PagaresModule-2dad75557107149d71079d4b3f5746ae4b5452767a20aaef10c90df6905cbc657d0acc88a921326ea775fd0cb5f651aa2c52adebc9c548f62d544d0290fbbf32"' : 'data-bs-target="#xs-components-links-module-PagaresModule-2dad75557107149d71079d4b3f5746ae4b5452767a20aaef10c90df6905cbc657d0acc88a921326ea775fd0cb5f651aa2c52adebc9c548f62d544d0290fbbf32"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagaresModule-2dad75557107149d71079d4b3f5746ae4b5452767a20aaef10c90df6905cbc657d0acc88a921326ea775fd0cb5f651aa2c52adebc9c548f62d544d0290fbbf32"' :
                                            'id="xs-components-links-module-PagaresModule-2dad75557107149d71079d4b3f5746ae4b5452767a20aaef10c90df6905cbc657d0acc88a921326ea775fd0cb5f651aa2c52adebc9c548f62d544d0290fbbf32"' }>
                                            <li class="link">
                                                <a href="components/ConfiguracionGeneracionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfiguracionGeneracionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneradorMasivoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneradorMasivoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PartidasPresupuestalesModule.html" data-type="entity-link" >PartidasPresupuestalesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' : 'data-bs-target="#xs-components-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' :
                                            'id="xs-components-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' }>
                                            <li class="link">
                                                <a href="components/AlertDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShrdSpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShrdSpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnackBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablaContraloriaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablaContraloriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableIESTComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableIESTComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToastIestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastIestComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' : 'data-bs-target="#xs-directives-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' :
                                        'id="xs-directives-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' }>
                                        <li class="link">
                                            <a href="directives/PagoVerdeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PagoVerdeDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' :
                                            'id="xs-pipes-links-module-SharedModule-0c1984aa575df8e388b928cd32120a87ac0788c2cd04672a6c4b0708a661e867f309195a651c40ec1c30a28c7d901eda03e6c616202b7246088d16b569c82743"' }>
                                            <li class="link">
                                                <a href="pipes/DineroToCurrencyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DineroToCurrencyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FormatoamdhhFormatodmaPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormatoamdhhFormatodmaPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NumberToMxnPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberToMxnPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShirtSaleModule.html" data-type="entity-link" >ShirtSaleModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CalculadoraNuComponent.html" data-type="entity-link" >CalculadoraNuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DetailItemComponent.html" data-type="entity-link" >DetailItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GeneradorEspecificoComponent.html" data-type="entity-link" >GeneradorEspecificoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginScreenComponent.html" data-type="entity-link" >LoginScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainPageComponent.html" data-type="entity-link" >MainPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainPageComponent-1.html" data-type="entity-link" >MainPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModuloCerradoComponent.html" data-type="entity-link" >ModuloCerradoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModuloCerradoComponent-1.html" data-type="entity-link" >ModuloCerradoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoPermisosComponent.html" data-type="entity-link" >NoPermisosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageConfigComponent.html" data-type="entity-link" >PageConfigComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PartidasPresupuestalesMainPageComponent.html" data-type="entity-link" >PartidasPresupuestalesMainPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectPagaresGeneracionComponent.html" data-type="entity-link" >SelectPagaresGeneracionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShrdSpinnerComponent.html" data-type="entity-link" >ShrdSpinnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableIESTComponent.html" data-type="entity-link" >TableIESTComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToastIestComponent.html" data-type="entity-link" >ToastIestComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FormBase.html" data-type="entity-link" >FormBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/SnackbarComponent.html" data-type="entity-link" >SnackbarComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdministraConfiguracionService.html" data-type="entity-link" >AdministraConfiguracionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CampamentoIestService.html" data-type="entity-link" >CampamentoIestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogosService.html" data-type="entity-link" >CatalogosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EspecialityServicesAService.html" data-type="entity-link" >EspecialityServicesAService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcelService.html" data-type="entity-link" >ExcelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GrupoconcursoService.html" data-type="entity-link" >GrupoconcursoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MyCustomIconServiceService.html" data-type="entity-link" >MyCustomIconServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PagareReinscripcionesService.html" data-type="entity-link" >PagareReinscripcionesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseAlumnoService.html" data-type="entity-link" >ResponseAlumnoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicioBase.html" data-type="entity-link" >ServicioBase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicioBase-1.html" data-type="entity-link" >ServicioBase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicioBase-2.html" data-type="entity-link" >ServicioBase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShirtsSaleService.html" data-type="entity-link" >ShirtsSaleService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Alumno.html" data-type="entity-link" >Alumno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Alumno-1.html" data-type="entity-link" >Alumno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlumnoResponse.html" data-type="entity-link" >AlumnoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Buscador25.html" data-type="entity-link" >Buscador25</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cataloge.html" data-type="entity-link" >Cataloge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Catalogo.html" data-type="entity-link" >Catalogo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CataloguePeriod.html" data-type="entity-link" >CataloguePeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConsultaFecha.html" data-type="entity-link" >ConsultaFecha</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CostoPromesaResponse.html" data-type="entity-link" >CostoPromesaResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/dataSnackBar.html" data-type="entity-link" >dataSnackBar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/dati.html" data-type="entity-link" >dati</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/especialidades.html" data-type="entity-link" >especialidades</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeneracionesResponse.html" data-type="entity-link" >GeneracionesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeneracionesResponse-1.html" data-type="entity-link" >GeneracionesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderTable.html" data-type="entity-link" >HeaderTable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/infoBar.html" data-type="entity-link" >infoBar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Item.html" data-type="entity-link" >Item</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/listParameters.html" data-type="entity-link" >listParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Node.html" data-type="entity-link" >Node</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/params.html" data-type="entity-link" >params</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PER_BuscadoresPersonas.html" data-type="entity-link" >PER_BuscadoresPersonas</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/presupuesto.html" data-type="entity-link" >presupuesto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAltaPagare.html" data-type="entity-link" >RequestAltaPagare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAltaPagare-1.html" data-type="entity-link" >RequestAltaPagare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestOperationGen.html" data-type="entity-link" >RequestOperationGen</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestOperationGen-1.html" data-type="entity-link" >RequestOperationGen</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResoponseTeams.html" data-type="entity-link" >ResoponseTeams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseCatalogosConcurso.html" data-type="entity-link" >ResponseCatalogosConcurso</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseEditabilityPeriode.html" data-type="entity-link" >ResponseEditabilityPeriode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseExtraFee.html" data-type="entity-link" >ResponseExtraFee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseGetFee.html" data-type="entity-link" >ResponseGetFee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseIdDescont.html" data-type="entity-link" >ResponseIdDescont</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponsePeriods.html" data-type="entity-link" >ResponsePeriods</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseTeamMembers.html" data-type="entity-link" >ResponseTeamMembers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseTipos.html" data-type="entity-link" >ResponseTipos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedCatalog.html" data-type="entity-link" >SelectedCatalog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedPagareGeneracion.html" data-type="entity-link" >SelectedPagareGeneracion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedPagareGeneracion-1.html" data-type="entity-link" >SelectedPagareGeneracion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShopingCart.html" data-type="entity-link" >ShopingCart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/student.html" data-type="entity-link" >student</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubNode.html" data-type="entity-link" >SubNode</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/NumberToMxnPipe.html" data-type="entity-link" >NumberToMxnPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/PintarPagado.html" data-type="entity-link" >PintarPagado</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});