from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify 



def upload_to(instance, filename):
    return '{filename}'.format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published') # to desplay only the published post

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)    #to protect post if we need to delete the category
    title = models.CharField(max_length=250)
    image = models.ImageField(
        _("image"), upload_to=upload_to, default='default.jpg', null=True)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, blank=True)   # we need to use as unique identifier(like id)
    published = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts') # if we delete user the post also deleted
    status = models.CharField(
        max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)  #in descending order
    
    def save(self, *args, **kwargs):
      self.slug = slugify(self.title)
      super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title