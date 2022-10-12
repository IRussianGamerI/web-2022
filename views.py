from django.shortcuts import render
from estate_market.models import Ad
from estate_market.models import Flat
from django.http import HttpResponse


def get_all_ads(request):
    return render(request, 'index.html', {
        'data': {
            'ads': Ad.objects.all()
        }
    })


def get_ad_with_flat(request, id):
    ad = Ad.objects.filter(AdID=id)[0]
    return render(request, 'ad_full.html', {
        'data': {
            'flat': Flat.objects.filter(FlatID=ad.FlatID.FlatID)[0],
            'ad': ad
        }
    })
