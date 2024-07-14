package com.swift.swiftproject;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import android.webkit.SslErrorHandler;
import android.net.http.SslError;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

public class WebsiteActivity extends AppCompatActivity {
    WebView view;
    String url = "https://neal.fun/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_website);
        FirebaseMessaging.getInstance().subscribeToTopic("Messaging").addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {}
        });
        WebView.setWebContentsDebuggingEnabled(true);
        view = findViewById(R.id.website);
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        view.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed();
            }
        });
        view.setWebChromeClient(new WebChromeClient());
        view.setScrollContainer(true);
        settings.setDisplayZoomControls(false);
        settings.setBuiltInZoomControls(false);
        view.loadUrl(url);
    }
    @Override
    public void onBackPressed() {
        if (view.canGoBack() && view != null) {
            view.goBack();
        } else {
            super.onBackPressed();
        }
    }
}