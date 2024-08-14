package com.cascade.cascadeproject;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import android.webkit.SslErrorHandler;
import android.net.http.SslError;
import android.webkit.WebSettings;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class WebsiteActivity extends AppCompatActivity {
    WebView view;
    protected static final String url = "https://neal.fun/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_website);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
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