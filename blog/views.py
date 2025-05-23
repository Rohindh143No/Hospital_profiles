from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import BlogPostForm
from .models import BlogPost
from collections import defaultdict

@login_required
def doctor_blog_view(request):
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES)
        if form.is_valid():
            blog = form.save(commit=False)
            blog.author = request.user
            blog.save()
            return redirect('blog:doctor_view')
    else:
        form = BlogPostForm()

    user_blogs = BlogPost.objects.filter(author=request.user).order_by('-created_at')
    return render(request, 'blog/doctor_.html', {'form': form, 'user_blogs': user_blogs})

@login_required
def patient_blog_view(request):
    categorized = defaultdict(list)
    blogs = BlogPost.objects.filter(is_draft=False).order_by('-created_at')
    for blog in blogs:
        categorized[blog.category].append(blog)
    return render(request, 'blog/patient_.html', {'categorized_blogs': dict(categorized)})


