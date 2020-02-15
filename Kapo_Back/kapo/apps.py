from django.apps import AppConfig


class KapoConfig(AppConfig):
    name = 'kapo'

    def ready(self):
        import kapo.signals

